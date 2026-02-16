#include <napi.h>
#include "matcher.h"

// Convert a JS CompiledRegion object → C++ RegionConstraint
static RegionConstraint regionFromJS(const Napi::Object& obj) {
    RegionConstraint r;

    bool lossless;
    r.mask = obj.Get("mask").As<Napi::BigInt>().Uint64Value(&lossless);

    if (obj.Has("whiteOp")) {
        r.whiteOp = obj.Get("whiteOp").As<Napi::String>().Utf8Value();
        r.whiteValue = obj.Get("whiteValue").As<Napi::Number>().Int32Value();
    }

    if (obj.Has("blackOp")) {
        r.blackOp = obj.Get("blackOp").As<Napi::String>().Utf8Value();
        r.blackValue = obj.Get("blackValue").As<Napi::Number>().Int32Value();
    }

    return r;
}

// Convert a JS CompiledStructure → C++ CompiledStructure
static CompiledStructure structureFromJS(const Napi::Object& obj) {
    CompiledStructure s;

    bool lossless;
    s.whiteRequired  = obj.Get("whiteRequired").As<Napi::BigInt>().Uint64Value(&lossless);
    s.whiteForbidden = obj.Get("whiteForbidden").As<Napi::BigInt>().Uint64Value(&lossless);
    s.blackRequired  = obj.Get("blackRequired").As<Napi::BigInt>().Uint64Value(&lossless);
    s.blackForbidden = obj.Get("blackForbidden").As<Napi::BigInt>().Uint64Value(&lossless);

    Napi::Array regions = obj.Get("regions").As<Napi::Array>();
    const uint32_t len = regions.Length();

    s.regions.reserve(len);
    for (uint32_t i = 0; i < len; i++) {
        Napi::Object rObj = regions.Get(i).As<Napi::Object>();
        s.regions.push_back(regionFromJS(rObj));
    }

    return s;
}

// JS wrapper: detectStructure(whitePawns, blackPawns, compiledStructure)
Napi::Value DetectStructure(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    if (info.Length() != 3) {
        Napi::TypeError::New(env, "Expected 3 arguments").ThrowAsJavaScriptException();
        return env.Null();
    }

    bool lossless;
    uint64_t whitePawns = info[0].As<Napi::BigInt>().Uint64Value(&lossless);
    uint64_t blackPawns = info[1].As<Napi::BigInt>().Uint64Value(&lossless);

    CompiledStructure s = structureFromJS(info[2].As<Napi::Object>());

    bool result = matchStructure(whitePawns, blackPawns, s);

    return Napi::Boolean::New(env, result);
}

// Module initialization
Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set(
        Napi::String::New(env, "detectStructure"),
        Napi::Function::New(env, DetectStructure)
    );
    return exports;
}

NODE_API_MODULE(pawn_structure, Init)
