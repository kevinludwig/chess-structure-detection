#include "matcher.h"
#include <stdint.h>

static inline int popcount64(uint64_t x) {
#if defined(_MSC_VER)
    return __popcnt64(x);
#elif defined(__GNUC__) || defined(__clang__)
    return __builtin_popcountll(x);
#else
    int c = 0;
    while (x) {
        x &= (x - 1);
        ++c;
    }
    return c;
#endif
}

bool matchStructure(
    uint64_t whitePawns,
    uint64_t blackPawns,
    const CompiledStructure& s
) {
    if ((whitePawns & s.whiteRequired) != s.whiteRequired) return false;
    if ((blackPawns & s.blackRequired) != s.blackRequired) return false;

    if (whitePawns & s.whiteForbidden) return false;
    if (blackPawns & s.blackForbidden) return false;

    for (const auto& z : s.whiteRegions) {
        const int count = popcount64(whitePawns & z.mask);
        if (count < z.min || count > z.max) return false;
    }

    for (const auto& z : s.blackRegions) {
        const int count = popcount64(blackPawns & z.mask);
        if (count < z.min || count > z.max) return false;
    }

    return true;
}
