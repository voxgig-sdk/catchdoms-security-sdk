# frozen_string_literal: true

# Typed models for the CatchdomsSecurity SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Domain entity data model.
#
# @!attribute [rw] age
#   @return [Integer, nil]
#
# @!attribute [rw] auction_end_date
#   @return [String, nil]
#
# @!attribute [rw] backlinks_count
#   @return [Integer, nil]
#
# @!attribute [rw] bids_count
#   @return [Integer, nil]
#
# @!attribute [rw] citation_flow
#   @return [Integer, nil]
#
# @!attribute [rw] domain_authority
#   @return [Integer, nil]
#
# @!attribute [rw] edu_gov_backlinks
#   @return [Integer, nil]
#
# @!attribute [rw] effective_price
#   @return [Float, nil]
#
# @!attribute [rw] has_gmb
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] language
#   @return [String, nil]
#
# @!attribute [rw] max_bid
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] pagerank
#   @return [Integer, nil]
#
# @!attribute [rw] price
#   @return [Float, nil]
#
# @!attribute [rw] purchase_url
#   @return [String, nil]
#
# @!attribute [rw] referring_domains
#   @return [Integer, nil]
#
# @!attribute [rw] score
#   @return [Integer]
#
# @!attribute [rw] source
#   @return [String]
#
# @!attribute [rw] tld
#   @return [String]
#
# @!attribute [rw] topical_trust_flow
#   @return [String, nil]
#
# @!attribute [rw] trust_flow
#   @return [Integer, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] wayback_first_date
#   @return [String, nil]
#
# @!attribute [rw] wayback_snapshots
#   @return [Integer, nil]
Domain = Struct.new(
  :age,
  :auction_end_date,
  :backlinks_count,
  :bids_count,
  :citation_flow,
  :domain_authority,
  :edu_gov_backlinks,
  :effective_price,
  :has_gmb,
  :id,
  :language,
  :max_bid,
  :name,
  :pagerank,
  :price,
  :purchase_url,
  :referring_domains,
  :score,
  :source,
  :tld,
  :topical_trust_flow,
  :trust_flow,
  :type,
  :wayback_first_date,
  :wayback_snapshots,
  keyword_init: true
)

# Request payload for Domain#list.
#
# @!attribute [rw] age
#   @return [Integer, nil]
#
# @!attribute [rw] auction_end_date
#   @return [String, nil]
#
# @!attribute [rw] backlinks_count
#   @return [Integer, nil]
#
# @!attribute [rw] bids_count
#   @return [Integer, nil]
#
# @!attribute [rw] citation_flow
#   @return [Integer, nil]
#
# @!attribute [rw] domain_authority
#   @return [Integer, nil]
#
# @!attribute [rw] edu_gov_backlinks
#   @return [Integer, nil]
#
# @!attribute [rw] effective_price
#   @return [Float, nil]
#
# @!attribute [rw] has_gmb
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] language
#   @return [String, nil]
#
# @!attribute [rw] max_bid
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] pagerank
#   @return [Integer, nil]
#
# @!attribute [rw] price
#   @return [Float, nil]
#
# @!attribute [rw] purchase_url
#   @return [String, nil]
#
# @!attribute [rw] referring_domains
#   @return [Integer, nil]
#
# @!attribute [rw] score
#   @return [Integer, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
#
# @!attribute [rw] tld
#   @return [String, nil]
#
# @!attribute [rw] topical_trust_flow
#   @return [String, nil]
#
# @!attribute [rw] trust_flow
#   @return [Integer, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] wayback_first_date
#   @return [String, nil]
#
# @!attribute [rw] wayback_snapshots
#   @return [Integer, nil]
DomainListMatch = Struct.new(
  :age,
  :auction_end_date,
  :backlinks_count,
  :bids_count,
  :citation_flow,
  :domain_authority,
  :edu_gov_backlinks,
  :effective_price,
  :has_gmb,
  :id,
  :language,
  :max_bid,
  :name,
  :pagerank,
  :price,
  :purchase_url,
  :referring_domains,
  :score,
  :source,
  :tld,
  :topical_trust_flow,
  :trust_flow,
  :type,
  :wayback_first_date,
  :wayback_snapshots,
  keyword_init: true
)

# Mcp entity data model.
#
# @!attribute [rw] capabilities
#   @return [Array, nil]
#
# @!attribute [rw] server
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
Mcp = Struct.new(
  :capabilities,
  :server,
  :version,
  keyword_init: true
)

# Request payload for Mcp#list.
#
# @!attribute [rw] capabilities
#   @return [Array, nil]
#
# @!attribute [rw] server
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
McpListMatch = Struct.new(
  :capabilities,
  :server,
  :version,
  keyword_init: true
)

# PendingDelete entity data model.
#
# @!attribute [rw] age
#   @return [Integer, nil]
#
# @!attribute [rw] backlinks_count
#   @return [Integer, nil]
#
# @!attribute [rw] days_until_drop
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] predicted_drop_date
#   @return [String]
#
# @!attribute [rw] referring_domains
#   @return [Integer, nil]
#
# @!attribute [rw] score
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] tld
#   @return [String]
PendingDelete = Struct.new(
  :age,
  :backlinks_count,
  :days_until_drop,
  :id,
  :name,
  :predicted_drop_date,
  :referring_domains,
  :score,
  :status,
  :tld,
  keyword_init: true
)

# Request payload for PendingDelete#list.
#
# @!attribute [rw] age
#   @return [Integer, nil]
#
# @!attribute [rw] backlinks_count
#   @return [Integer, nil]
#
# @!attribute [rw] days_until_drop
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] predicted_drop_date
#   @return [String, nil]
#
# @!attribute [rw] referring_domains
#   @return [Integer, nil]
#
# @!attribute [rw] score
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] tld
#   @return [String, nil]
PendingDeleteListMatch = Struct.new(
  :age,
  :backlinks_count,
  :days_until_drop,
  :id,
  :name,
  :predicted_drop_date,
  :referring_domains,
  :score,
  :status,
  :tld,
  keyword_init: true
)

