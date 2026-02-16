#include "matcher.h"
#include <stdint.h>

static inline int popcount64(uint64_t x) {
#if defined(_MSC_VER)
    return __popcnt64(x);
#elif defined(__GNUC__) || defined(__clang__)
    return __builtin_popcountll(x);
#else
    // Portable fallback
    int c = 0;
    while (x) {
        x &= (x - 1);
        ++c;
    }
    return c;
#endif
}

static inline bool evalOp(int a, const std::string& op, int b) {
    if (op == "==") return a == b;
    if (op == "!=") return a != b;
    if (op == ">")  return a >  b;
    if (op == ">=") return a >= b;
    if (op == "<")  return a <  b;
    if (op == "<=") return a <= b;
    return false;
}

bool matchStructure(
    uint64_t whitePawns,
    uint64_t blackPawns,
    const CompiledStructure& s
) {
    // Required squares: all required bits must be set
    if ((whitePawns & s.whiteRequired) != s.whiteRequired) return false;
    if ((blackPawns & s.blackRequired) != s.blackRequired) return false;

    // Forbidden squares: none of the forbidden bits may be set
    if (whitePawns & s.whiteForbidden) return false;
    if (blackPawns & s.blackForbidden) return false;

    // Region constraints
    for (const auto& r : s.regions) {
        const uint64_t wMask = whitePawns & r.mask;
        const uint64_t bMask = blackPawns & r.mask;

        const int wCount = popcount64(wMask);
        const int bCount = popcount64(bMask);

        if (!r.whiteOp.empty()) {
            if (!evalOp(wCount, r.whiteOp, r.whiteValue)) {
                return false;
            }
        }

        if (!r.blackOp.empty()) {
            if (!evalOp(bCount, r.blackOp, r.blackValue)) {
                return false;
            }
        }
    }

    return true;
}
