#include <napi.h>
#include "matcher.h"

static ZoneConstraint zoneFromJS(const Napi::Object& obj) {
    ZoneConstraint z;
    bool lossless;
    z.mask = obj.Get("mask").As<Napi::BigInt>().Uint64Value(&lossless);
    z.min = obj.Get("min").As<Napi::Number>().Int32Value();
    z.max = obj.Get("max").As<Napi::Number>().Int32Value();
    return z;
}

static void regionsFromJS(const Napi::Array& arr, std::vector<ZoneConstraint>& out) {
    const uint32_t len = arr.Length();
    out.reserve(len);
    for (uint32_t i = 0; i < len; i++) {
        out.push_back(zoneFromJS(arr.Get(i).As<Napi::Object>()));
    }
}

static CompiledStructure structureFromJS(const Napi::Object& obj) {
    CompiledStructure s;

    bool lossless;
    s.whiteRequired  = obj.Get("whiteRequired").As<Napi::BigInt>().Uint64Value(&lossless);
    s.whiteForbidden = obj.Get("whiteForbidden").As<Napi::BigInt>().Uint64Value(&lossless);
    s.blackRequired  = obj.Get("blackRequired").As<Napi::BigInt>().Uint64Value(&lossless);
    s.blackForbidden = obj.Get("blackForbidden").As<Napi::BigInt>().Uint64Value(&lossless);

    regionsFromJS(obj.Get("whiteRegions").As<Napi::Array>(), s.whiteRegions);
    regionsFromJS(obj.Get("blackRegions").As<Napi::Array>(), s.blackRegions);

    return s;
}

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

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set(
        Napi::String::New(env, "detectStructure"),
        Napi::Function::New(env, DetectStructure)
    );
    return exports;
}

NODE_API_MODULE(pawn_structure, Init)
