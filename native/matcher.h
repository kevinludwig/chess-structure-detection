#pragma once
#include <vector>
#include <stdint.h>

struct ZoneConstraint {
    uint64_t mask;
    int min;
    int max;
};

struct CompiledStructure {
    uint64_t whiteRequired;
    uint64_t whiteForbidden;
    uint64_t blackRequired;
    uint64_t blackForbidden;
    std::vector<ZoneConstraint> whiteRegions;
    std::vector<ZoneConstraint> blackRegions;
};

bool matchStructure(
    uint64_t whitePawns,
    uint64_t blackPawns,
    const CompiledStructure& s
);
