<?php
declare(strict_types=1);

// Typed models for the CatchdomsSecurity SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Domain entity data model. */
class Domain
{
    public ?int $age = null;
    public ?string $auction_end_date = null;
    public ?int $backlinks_count = null;
    public ?int $bids_count = null;
    public ?int $citation_flow = null;
    public ?int $domain_authority = null;
    public ?int $edu_gov_backlink = null;
    public ?float $effective_price = null;
    public ?bool $has_gmb = null;
    public int $id;
    public ?string $language = null;
    public ?float $max_bid = null;
    public string $name;
    public ?int $pagerank = null;
    public ?float $price = null;
    public ?string $purchase_url = null;
    public ?int $referring_domain = null;
    public int $score;
    public string $source;
    public string $tld;
    public ?string $topical_trust_flow = null;
    public ?int $trust_flow = null;
    public ?string $type = null;
    public ?string $wayback_first_date = null;
    public ?int $wayback_snapshot = null;
}

/** Request payload for Domain#list. */
class DomainListMatch
{
    public ?int $age = null;
    public ?string $auction_end_date = null;
    public ?int $backlinks_count = null;
    public ?int $bids_count = null;
    public ?int $citation_flow = null;
    public ?int $domain_authority = null;
    public ?int $edu_gov_backlink = null;
    public ?float $effective_price = null;
    public ?bool $has_gmb = null;
    public ?int $id = null;
    public ?string $language = null;
    public ?float $max_bid = null;
    public ?string $name = null;
    public ?int $pagerank = null;
    public ?float $price = null;
    public ?string $purchase_url = null;
    public ?int $referring_domain = null;
    public ?int $score = null;
    public ?string $source = null;
    public ?string $tld = null;
    public ?string $topical_trust_flow = null;
    public ?int $trust_flow = null;
    public ?string $type = null;
    public ?string $wayback_first_date = null;
    public ?int $wayback_snapshot = null;
}

/** Mcp entity data model. */
class Mcp
{
    public ?array $capability = null;
    public ?string $server = null;
    public ?string $version = null;
}

/** Request payload for Mcp#list. */
class McpListMatch
{
    public ?array $capability = null;
    public ?string $server = null;
    public ?string $version = null;
}

/** PendingDelete entity data model. */
class PendingDelete
{
    public ?int $age = null;
    public ?int $backlinks_count = null;
    public ?int $days_until_drop = null;
    public int $id;
    public string $name;
    public string $predicted_drop_date;
    public ?int $referring_domain = null;
    public ?int $score = null;
    public string $status;
    public string $tld;
}

/** Request payload for PendingDelete#list. */
class PendingDeleteListMatch
{
    public ?int $age = null;
    public ?int $backlinks_count = null;
    public ?int $days_until_drop = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?string $predicted_drop_date = null;
    public ?int $referring_domain = null;
    public ?int $score = null;
    public ?string $status = null;
    public ?string $tld = null;
}

