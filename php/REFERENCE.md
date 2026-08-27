# CatchdomsSecurity PHP SDK Reference

Complete API reference for the CatchdomsSecurity PHP SDK.


## CatchdomsSecuritySDK

### Constructor

```php
require_once __DIR__ . '/catchdomssecurity_sdk.php';

$client = new CatchdomsSecuritySDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CatchdomsSecuritySDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = CatchdomsSecuritySDK::test();
```


### Instance Methods

#### `Domain($data = null)`

Create a new `DomainEntity` instance. Pass `null` for no initial data.

#### `Mcp($data = null)`

Create a new `McpEntity` instance. Pass `null` for no initial data.

#### `PendingDelete($data = null)`

Create a new `PendingDeleteEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): CatchdomsSecurityUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## DomainEntity

```php
$domain = $client->Domain();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `age` | `int` | No | Years since first Wayback snapshot |
| `auction_end_date` | `string` | No | Auction end date and time (ISO 8601) |
| `backlinks_count` | `int` | No | Total number of backlinks |
| `bids_count` | `int` | No | Number of bids |
| `citation_flow` | `int` | No | Majestic Citation Flow score (0-100) |
| `domain_authority` | `int` | No | Moz Domain Authority score (0-100) |
| `edu_gov_backlinks` | `int` | No | Number of EDU/GOV backlinks |
| `effective_price` | `float` | No | Effective price (max_bid or price) in EUR |
| `has_gmb` | `bool` | No | Has active Google Business Profile |
| `id` | `int` | Yes | Unique domain identifier |
| `language` | `string` | No | Detected content language (e.g., EN, FR, DE) |
| `max_bid` | `float` | No | Current highest bid in EUR |
| `name` | `string` | Yes | Domain name |
| `pagerank` | `int` | No | Historical PageRank value |
| `price` | `float` | No | Starting price or buy-now price in EUR |
| `purchase_url` | `string` | No | Direct URL to purchase or bid on the domain |
| `referring_domains` | `int` | No | Number of unique referring domains |
| `score` | `int` | Yes | CatchDoms quality score (0-100) |
| `source` | `string` | Yes | Platform source (e.g., godaddy, dropcatch, regfree) |
| `tld` | `string` | Yes | Top-level domain extension |
| `topical_trust_flow` | `string` | No | Majestic Topical Trust Flow category |
| `trust_flow` | `int` | No | Majestic Trust Flow score (0-100) |
| `type` | `string` | No | Domain listing type |
| `wayback_first_date` | `string` | No | Date of first Wayback snapshot |
| `wayback_snapshots` | `int` | No | Number of Wayback Machine snapshots |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Domain()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DomainEntity`

Create a new `DomainEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## McpEntity

```php
$mcp = $client->Mcp();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `capabilities` | `array` | No |  |
| `server` | `string` | No |  |
| `version` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Mcp()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): McpEntity`

Create a new `McpEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PendingDeleteEntity

```php
$pending_delete = $client->PendingDelete();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `age` | `int` | No | Years since first Wayback snapshot |
| `backlinks_count` | `int` | No | Total number of backlinks |
| `days_until_drop` | `int` | No | Days until predicted drop date |
| `id` | `int` | Yes | Unique domain identifier |
| `name` | `string` | Yes | Domain name |
| `predicted_drop_date` | `string` | Yes | Predicted drop date (YYYY-MM-DD) |
| `referring_domains` | `int` | No | Number of unique referring domains |
| `score` | `int` | No | CatchDoms quality score (0-100) |
| `status` | `string` | Yes | Current domain status |
| `tld` | `string` | Yes | Top-level domain extension |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->PendingDelete()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PendingDeleteEntity`

Create a new `PendingDeleteEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new CatchdomsSecuritySDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

