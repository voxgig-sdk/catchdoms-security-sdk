-- Typed models for the CatchdomsSecurity SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Domain
---@field age? number
---@field auction_end_date? string
---@field backlinks_count? number
---@field bids_count? number
---@field citation_flow? number
---@field domain_authority? number
---@field edu_gov_backlinks? number
---@field effective_price? number
---@field has_gmb? boolean
---@field id number
---@field language? string
---@field max_bid? number
---@field name string
---@field pagerank? number
---@field price? number
---@field purchase_url? string
---@field referring_domains? number
---@field score number
---@field source string
---@field tld string
---@field topical_trust_flow? string
---@field trust_flow? number
---@field type? string
---@field wayback_first_date? string
---@field wayback_snapshots? number

---@class DomainListMatch
---@field age? number
---@field auction_end_date? string
---@field backlinks_count? number
---@field bids_count? number
---@field citation_flow? number
---@field domain_authority? number
---@field edu_gov_backlinks? number
---@field effective_price? number
---@field has_gmb? boolean
---@field id? number
---@field language? string
---@field max_bid? number
---@field name? string
---@field pagerank? number
---@field price? number
---@field purchase_url? string
---@field referring_domains? number
---@field score? number
---@field source? string
---@field tld? string
---@field topical_trust_flow? string
---@field trust_flow? number
---@field type? string
---@field wayback_first_date? string
---@field wayback_snapshots? number

---@class Mcp
---@field capabilities? table
---@field server? string
---@field version? string

---@class McpListMatch
---@field capabilities? table
---@field server? string
---@field version? string

---@class PendingDelete
---@field age? number
---@field backlinks_count? number
---@field days_until_drop? number
---@field id number
---@field name string
---@field predicted_drop_date string
---@field referring_domains? number
---@field score? number
---@field status string
---@field tld string

---@class PendingDeleteListMatch
---@field age? number
---@field backlinks_count? number
---@field days_until_drop? number
---@field id? number
---@field name? string
---@field predicted_drop_date? string
---@field referring_domains? number
---@field score? number
---@field status? string
---@field tld? string

local M = {}

return M
