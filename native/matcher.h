#pragma once
#include <string>
#include <vector>
#include <stdint.h>

struct RegionConstraint {
    uint64_t mask;
    std::string whiteOp;
    int whiteValue;
    std::string blackOp;
    int blackValue;
};

struct CompiledStructure {
    uint64_t whiteRequired;
    uint64_t whiteForbidden;
    uint64_t blackRequired;
    uint64_t blackForbidden;
    std::vector<RegionConstraint> regions;
};

bool matchStructure(
    uint64_t whitePawns,
    uint64_t blackPawns,
    const CompiledStructure& s
);
