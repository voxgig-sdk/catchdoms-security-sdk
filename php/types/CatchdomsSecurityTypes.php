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
    public ?int $edu_gov_backlinks = null;
    public ?float $effective_price = null;
    public ?bool $has_gmb = null;
    public int $id;
    public ?string $language = null;
    public ?float $max_bid = null;
    public string $name;
    public ?int $pagerank = null;
    public ?float $price = null;
    public ?string $purchase_url = null;
    public ?int $referring_domains = null;
    public int $score;
    public string $source;
    public string $tld;
    public ?string $topical_trust_flow = null;
    public ?int $trust_flow = null;
    public ?string $type = null;
    public ?string $wayback_first_date = null;
    public ?int $wayback_snapshots = null;
}

/** Request payload for Domain#list. */
class DomainListMatch
{
    public ?int $age_min = null;
    public ?string $category = null;
    public ?int $cf_min = null;
    public ?string $contain = null;
    public ?int $da_min = null;
    public ?int $has_backlink = null;
    public ?int $has_bid = null;
    public ?int $has_edu_gov = null;
    public ?int $has_gmb = null;
    public ?string $language = null;
    public ?int $page = null;
    public ?int $per_page = null;
    public ?float $price_max = null;
    public ?float $price_min = null;
    public ?int $rd_min = null;
    public ?int $score_min = null;
    public ?int $snapshots_min = null;
    public ?string $source = null;
    public ?int $tf_min = null;
    public ?string $tld = null;
    public ?string $type = null;
}

/** Mcp entity data model. */
class Mcp
{
    public ?array $capabilities = null;
    public ?string $server = null;
    public ?string $version = null;
}

/** Request payload for Mcp#list. */
class McpListMatch
{
    public ?array $capabilities = null;
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
    public ?int $referring_domains = null;
    public ?int $score = null;
    public string $status;
    public string $tld;
}

/** Request payload for PendingDelete#list. */
class PendingDeleteListMatch
{
    public ?string $drop_date_max = null;
    public ?string $drop_date_min = null;
    public ?int $page = null;
    public ?int $per_page = null;
    public ?string $status = null;
    public ?string $tld = null;
}

