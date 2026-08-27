# Typed models for the CatchdomsSecurity SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class DomainRequired(TypedDict):
    id: int
    name: str
    score: int
    source: str
    tld: str


class Domain(DomainRequired, total=False):
    age: int
    auction_end_date: str
    backlinks_count: int
    bids_count: int
    citation_flow: int
    domain_authority: int
    edu_gov_backlinks: int
    effective_price: float
    has_gmb: bool
    language: str
    max_bid: float
    pagerank: int
    price: float
    purchase_url: str
    referring_domains: int
    topical_trust_flow: str
    trust_flow: int
    type: str
    wayback_first_date: str
    wayback_snapshots: int


class DomainListMatch(TypedDict, total=False):
    age_min: int
    category: str
    cf_min: int
    contain: str
    da_min: int
    has_backlink: int
    has_bid: int
    has_edu_gov: int
    has_gmb: int
    language: str
    page: int
    per_page: int
    price_max: float
    price_min: float
    rd_min: int
    score_min: int
    snapshots_min: int
    source: str
    tf_min: int
    tld: str
    type: str


class Mcp(TypedDict, total=False):
    capabilities: list
    server: str
    version: str


class McpListMatch(TypedDict, total=False):
    capabilities: list
    server: str
    version: str


class PendingDeleteRequired(TypedDict):
    id: int
    name: str
    predicted_drop_date: str
    status: str
    tld: str


class PendingDelete(PendingDeleteRequired, total=False):
    age: int
    backlinks_count: int
    days_until_drop: int
    referring_domains: int
    score: int


class PendingDeleteListMatch(TypedDict, total=False):
    drop_date_max: str
    drop_date_min: str
    page: int
    per_page: int
    status: str
    tld: str
