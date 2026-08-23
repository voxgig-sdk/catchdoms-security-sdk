# CatchdomsSecurity PHP SDK



The PHP SDK for the CatchdomsSecurity API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Domain()` — with named operations (`list`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/catchdoms-security-sdk/releases](https://github.com/voxgig-sdk/catchdoms-security-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'catchdomssecurity_sdk.php';

$client = new CatchdomsSecuritySDK([
    "apikey" => getenv("CATCHDOMS_SECURITY_APIKEY"),
]);
```

### 2. List domain records

```php
try {
    // list() returns an array of Domain records — iterate directly.
    $domains = $client->Domain()->list();
    foreach ($domains as $item) {
        echo $item["id"] . " " . $item["age"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $mcps = $client->Mcp()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = CatchdomsSecuritySDK::test();

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$mcp = $client->Mcp()->list();
print_r($mcp);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new CatchdomsSecuritySDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
CATCHDOMS_SECURITY_TEST_LIVE=TRUE
CATCHDOMS_SECURITY_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### CatchdomsSecuritySDK

```php
require_once 'catchdomssecurity_sdk.php';
$client = new CatchdomsSecuritySDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = CatchdomsSecuritySDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### CatchdomsSecuritySDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Domain` | `($data): DomainEntity` | Create a Domain entity instance. |
| `Mcp` | `($data): McpEntity` | Create a Mcp entity instance. |
| `PendingDelete` | `($data): PendingDeleteEntity` | Create a PendingDelete entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### Domain

| Field | Description |
| --- | --- |
| `age` | Years since first Wayback snapshot |
| `auction_end_date` | Auction end date and time (ISO 8601) |
| `backlinks_count` | Total number of backlinks |
| `bids_count` | Number of bids |
| `citation_flow` | Majestic Citation Flow score (0-100) |
| `domain_authority` | Moz Domain Authority score (0-100) |
| `edu_gov_backlinks` | Number of EDU/GOV backlinks |
| `effective_price` | Effective price (max_bid or price) in EUR |
| `has_gmb` | Has active Google Business Profile |
| `id` | Unique domain identifier |
| `language` | Detected content language (e.g., EN, FR, DE) |
| `max_bid` | Current highest bid in EUR |
| `name` | Domain name |
| `pagerank` | Historical PageRank value |
| `price` | Starting price or buy-now price in EUR |
| `purchase_url` | Direct URL to purchase or bid on the domain |
| `referring_domains` | Number of unique referring domains |
| `score` | CatchDoms quality score (0-100) |
| `source` | Platform source (e.g., godaddy, dropcatch, regfree) |
| `tld` | Top-level domain extension |
| `topical_trust_flow` | Majestic Topical Trust Flow category |
| `trust_flow` | Majestic Trust Flow score (0-100) |
| `type` | Domain listing type |
| `wayback_first_date` | Date of first Wayback snapshot |
| `wayback_snapshots` | Number of Wayback Machine snapshots |

Operations: List.

API path: `/api/domains`

#### Mcp

| Field | Description |
| --- | --- |
| `capabilities` |  |
| `server` |  |
| `version` |  |

Operations: List.

API path: `/mcp/catchdoms`

#### PendingDelete

| Field | Description |
| --- | --- |
| `age` | Years since first Wayback snapshot |
| `backlinks_count` | Total number of backlinks |
| `days_until_drop` | Days until predicted drop date |
| `id` | Unique domain identifier |
| `name` | Domain name |
| `predicted_drop_date` | Predicted drop date (YYYY-MM-DD) |
| `referring_domains` | Number of unique referring domains |
| `score` | CatchDoms quality score (0-100) |
| `status` | Current domain status |
| `tld` | Top-level domain extension |

Operations: List.

API path: `/api/pending-delete`



## Entities


### Domain

Create an instance: `$domain = $client->Domain();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `age` | `int` | Years since first Wayback snapshot |
| `auction_end_date` | `string` | Auction end date and time (ISO 8601) |
| `backlinks_count` | `int` | Total number of backlinks |
| `bids_count` | `int` | Number of bids |
| `citation_flow` | `int` | Majestic Citation Flow score (0-100) |
| `domain_authority` | `int` | Moz Domain Authority score (0-100) |
| `edu_gov_backlinks` | `int` | Number of EDU/GOV backlinks |
| `effective_price` | `float` | Effective price (max_bid or price) in EUR |
| `has_gmb` | `bool` | Has active Google Business Profile |
| `id` | `int` | Unique domain identifier |
| `language` | `string` | Detected content language (e.g., EN, FR, DE) |
| `max_bid` | `float` | Current highest bid in EUR |
| `name` | `string` | Domain name |
| `pagerank` | `int` | Historical PageRank value |
| `price` | `float` | Starting price or buy-now price in EUR |
| `purchase_url` | `string` | Direct URL to purchase or bid on the domain |
| `referring_domains` | `int` | Number of unique referring domains |
| `score` | `int` | CatchDoms quality score (0-100) |
| `source` | `string` | Platform source (e.g., godaddy, dropcatch, regfree) |
| `tld` | `string` | Top-level domain extension |
| `topical_trust_flow` | `string` | Majestic Topical Trust Flow category |
| `trust_flow` | `int` | Majestic Trust Flow score (0-100) |
| `type` | `string` | Domain listing type |
| `wayback_first_date` | `string` | Date of first Wayback snapshot |
| `wayback_snapshots` | `int` | Number of Wayback Machine snapshots |

#### Example: List

```php
// list() returns an array of Domain records (throws on error).
$domains = $client->Domain()->list();
```


### Mcp

Create an instance: `$mcp = $client->Mcp();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capabilities` | `array` |  |
| `server` | `string` |  |
| `version` | `string` |  |

#### Example: List

```php
// list() returns an array of Mcp records (throws on error).
$mcps = $client->Mcp()->list();
```


### PendingDelete

Create an instance: `$pending_delete = $client->PendingDelete();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `age` | `int` | Years since first Wayback snapshot |
| `backlinks_count` | `int` | Total number of backlinks |
| `days_until_drop` | `int` | Days until predicted drop date |
| `id` | `int` | Unique domain identifier |
| `name` | `string` | Domain name |
| `predicted_drop_date` | `string` | Predicted drop date (YYYY-MM-DD) |
| `referring_domains` | `int` | Number of unique referring domains |
| `score` | `int` | CatchDoms quality score (0-100) |
| `status` | `string` | Current domain status |
| `tld` | `string` | Top-level domain extension |

#### Example: List

```php
// list() returns an array of PendingDelete records (throws on error).
$pending_deletes = $client->PendingDelete()->list();
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── catchdomssecurity_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`catchdomssecurity_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$mcp = $client->Mcp();
$mcp->list();

// $mcp->data_get() now returns the mcp data from the last list
// $mcp->match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
