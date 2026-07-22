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
| `age` | `int` | No |  |
| `auction_end_date` | `string` | No |  |
| `backlinks_count` | `int` | No |  |
| `bids_count` | `int` | No |  |
| `citation_flow` | `int` | No |  |
| `domain_authority` | `int` | No |  |
| `edu_gov_backlink` | `int` | No |  |
| `effective_price` | `float` | No |  |
| `has_gmb` | `bool` | No |  |
| `id` | `int` | Yes |  |
| `language` | `string` | No |  |
| `max_bid` | `float` | No |  |
| `name` | `string` | Yes |  |
| `pagerank` | `int` | No |  |
| `price` | `float` | No |  |
| `purchase_url` | `string` | No |  |
| `referring_domain` | `int` | No |  |
| `score` | `int` | Yes |  |
| `source` | `string` | Yes |  |
| `tld` | `string` | Yes |  |
| `topical_trust_flow` | `string` | No |  |
| `trust_flow` | `int` | No |  |
| `type` | `string` | No |  |
| `wayback_first_date` | `string` | No |  |
| `wayback_snapshot` | `int` | No |  |

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
| `capability` | `array` | No |  |
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
| `age` | `int` | No |  |
| `backlinks_count` | `int` | No |  |
| `days_until_drop` | `int` | No |  |
| `id` | `int` | Yes |  |
| `name` | `string` | Yes |  |
| `predicted_drop_date` | `string` | Yes |  |
| `referring_domain` | `int` | No |  |
| `score` | `int` | No |  |
| `status` | `string` | Yes |  |
| `tld` | `string` | Yes |  |

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

