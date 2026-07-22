// Typed models for the CatchdomsSecurity SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Domain {
  age?: number
  auction_end_date?: string
  backlinks_count?: number
  bids_count?: number
  citation_flow?: number
  domain_authority?: number
  edu_gov_backlink?: number
  effective_price?: number
  has_gmb?: boolean
  id: number
  language?: string
  max_bid?: number
  name: string
  pagerank?: number
  price?: number
  purchase_url?: string
  referring_domain?: number
  score: number
  source: string
  tld: string
  topical_trust_flow?: string
  trust_flow?: number
  type?: string
  wayback_first_date?: string
  wayback_snapshot?: number
}

export interface DomainListMatch {
  age?: number
  auction_end_date?: string
  backlinks_count?: number
  bids_count?: number
  citation_flow?: number
  domain_authority?: number
  edu_gov_backlink?: number
  effective_price?: number
  has_gmb?: boolean
  id?: number
  language?: string
  max_bid?: number
  name?: string
  pagerank?: number
  price?: number
  purchase_url?: string
  referring_domain?: number
  score?: number
  source?: string
  tld?: string
  topical_trust_flow?: string
  trust_flow?: number
  type?: string
  wayback_first_date?: string
  wayback_snapshot?: number
}

export interface Mcp {
  capability?: any[]
  server?: string
  version?: string
}

export interface McpListMatch {
  capability?: any[]
  server?: string
  version?: string
}

export interface PendingDelete {
  age?: number
  backlinks_count?: number
  days_until_drop?: number
  id: number
  name: string
  predicted_drop_date: string
  referring_domain?: number
  score?: number
  status: string
  tld: string
}

export interface PendingDeleteListMatch {
  age?: number
  backlinks_count?: number
  days_until_drop?: number
  id?: number
  name?: string
  predicted_drop_date?: string
  referring_domain?: number
  score?: number
  status?: string
  tld?: string
}

