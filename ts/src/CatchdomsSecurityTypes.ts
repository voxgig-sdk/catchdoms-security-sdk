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
  edu_gov_backlinks?: number
  effective_price?: number
  has_gmb?: boolean
  id: number
  language?: string
  max_bid?: number
  name: string
  pagerank?: number
  price?: number
  purchase_url?: string
  referring_domains?: number
  score: number
  source: string
  tld: string
  topical_trust_flow?: string
  trust_flow?: number
  type?: string
  wayback_first_date?: string
  wayback_snapshots?: number
}

export interface DomainListMatch {
  age_min?: number
  category?: string
  cf_min?: number
  contain?: string
  da_min?: number
  has_backlink?: number
  has_bid?: number
  has_edu_gov?: number
  has_gmb?: number
  language?: string
  page?: number
  per_page?: number
  price_max?: number
  price_min?: number
  rd_min?: number
  score_min?: number
  snapshots_min?: number
  source?: string
  tf_min?: number
  tld?: string
  type?: string
}

export interface Mcp {
  capabilities?: any[]
  server?: string
  version?: string
}

export interface McpListMatch {
  capabilities?: any[]
  server?: string
  version?: string

  // Selects a custom action instead of the plain list:
  //   'catchdom'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface PendingDelete {
  age?: number
  backlinks_count?: number
  days_until_drop?: number
  id: number
  name: string
  predicted_drop_date: string
  referring_domains?: number
  score?: number
  status: string
  tld: string
}

export interface PendingDeleteListMatch {
  drop_date_max?: string
  drop_date_min?: string
  page?: number
  per_page?: number
  status?: string
  tld?: string
}

