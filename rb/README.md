# CatchdomsSecurity Ruby SDK



The Ruby SDK for the CatchdomsSecurity API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Domain` — with named operations (`list`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/catchdoms-security-sdk/releases](https://github.com/voxgig-sdk/catchdoms-security-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "CatchdomsSecurity_sdk"

client = CatchdomsSecuritySDK.new({
  "apikey" => ENV["CATCHDOMS_SECURITY_APIKEY"],
})
```

### 2. List domain records

```ruby
begin
  # list returns an Array of Domain records — iterate directly.
  domains = client.Domain.list
  domains.each do |item|
    puts "#{item["id"]} #{item["age"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  mcps = client.Mcp.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = CatchdomsSecuritySDK.test

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
mcp = client.Mcp.list()
puts mcp
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = CatchdomsSecuritySDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
CATCHDOMS_SECURITY_TEST_LIVE=TRUE
CATCHDOMS_SECURITY_APIKEY=<your-key>
```

Then run:

```bash
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### CatchdomsSecuritySDK

```ruby
require_relative "CatchdomsSecurity_sdk"
client = CatchdomsSecuritySDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `String` | API key for authentication. |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = CatchdomsSecuritySDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### CatchdomsSecuritySDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `Domain` | `(data) -> DomainEntity` | Create a Domain entity instance. |
| `Mcp` | `(data) -> McpEntity` | Create a Mcp entity instance. |
| `PendingDelete` | `(data) -> PendingDeleteEntity` | Create a PendingDelete entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `CatchdomsSecurityError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Create an instance: `domain = client.Domain`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `age` | `Integer` | Years since first Wayback snapshot |
| `auction_end_date` | `String` | Auction end date and time (ISO 8601) |
| `backlinks_count` | `Integer` | Total number of backlinks |
| `bids_count` | `Integer` | Number of bids |
| `citation_flow` | `Integer` | Majestic Citation Flow score (0-100) |
| `domain_authority` | `Integer` | Moz Domain Authority score (0-100) |
| `edu_gov_backlinks` | `Integer` | Number of EDU/GOV backlinks |
| `effective_price` | `Float` | Effective price (max_bid or price) in EUR |
| `has_gmb` | `Boolean` | Has active Google Business Profile |
| `id` | `Integer` | Unique domain identifier |
| `language` | `String` | Detected content language (e.g., EN, FR, DE) |
| `max_bid` | `Float` | Current highest bid in EUR |
| `name` | `String` | Domain name |
| `pagerank` | `Integer` | Historical PageRank value |
| `price` | `Float` | Starting price or buy-now price in EUR |
| `purchase_url` | `String` | Direct URL to purchase or bid on the domain |
| `referring_domains` | `Integer` | Number of unique referring domains |
| `score` | `Integer` | CatchDoms quality score (0-100) |
| `source` | `String` | Platform source (e.g., godaddy, dropcatch, regfree) |
| `tld` | `String` | Top-level domain extension |
| `topical_trust_flow` | `String` | Majestic Topical Trust Flow category |
| `trust_flow` | `Integer` | Majestic Trust Flow score (0-100) |
| `type` | `String` | Domain listing type |
| `wayback_first_date` | `String` | Date of first Wayback snapshot |
| `wayback_snapshots` | `Integer` | Number of Wayback Machine snapshots |

#### Example: List

```ruby
# list returns an Array of Domain records (raises on error).
domains = client.Domain.list
```


### Mcp

Create an instance: `mcp = client.Mcp`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capabilities` | `Array` |  |
| `server` | `String` |  |
| `version` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Mcp records (raises on error).
mcps = client.Mcp.list
```


### PendingDelete

Create an instance: `pending_delete = client.PendingDelete`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `age` | `Integer` | Years since first Wayback snapshot |
| `backlinks_count` | `Integer` | Total number of backlinks |
| `days_until_drop` | `Integer` | Days until predicted drop date |
| `id` | `Integer` | Unique domain identifier |
| `name` | `String` | Domain name |
| `predicted_drop_date` | `String` | Predicted drop date (YYYY-MM-DD) |
| `referring_domains` | `Integer` | Number of unique referring domains |
| `score` | `Integer` | CatchDoms quality score (0-100) |
| `status` | `String` | Current domain status |
| `tld` | `String` | Top-level domain extension |

#### Example: List

```ruby
# list returns an Array of PendingDelete records (raises on error).
pending_deletes = client.PendingDelete.list
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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── CatchdomsSecurity_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`CatchdomsSecurity_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
mcp = client.Mcp
mcp.list()

# mcp.data_get now returns the mcp data from the last list
# mcp.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
