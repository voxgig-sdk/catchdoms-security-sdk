# CatchdomsSecurity Ruby SDK Reference

Complete API reference for the CatchdomsSecurity Ruby SDK.


## CatchdomsSecuritySDK

### Constructor

```ruby
require_relative 'CatchdomsSecurity_sdk'

client = CatchdomsSecuritySDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CatchdomsSecuritySDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = CatchdomsSecuritySDK.test
```


### Instance Methods

#### `Domain(data = nil)`

Create a new `Domain` entity instance. Pass `nil` for no initial data.

#### `Mcp(data = nil)`

Create a new `Mcp` entity instance. Pass `nil` for no initial data.

#### `PendingDelete(data = nil)`

Create a new `PendingDelete` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## DomainEntity

```ruby
domain = client.Domain
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `age` | `Integer` | No | Years since first Wayback snapshot |
| `auction_end_date` | `String` | No | Auction end date and time (ISO 8601) |
| `backlinks_count` | `Integer` | No | Total number of backlinks |
| `bids_count` | `Integer` | No | Number of bids |
| `citation_flow` | `Integer` | No | Majestic Citation Flow score (0-100) |
| `domain_authority` | `Integer` | No | Moz Domain Authority score (0-100) |
| `edu_gov_backlinks` | `Integer` | No | Number of EDU/GOV backlinks |
| `effective_price` | `Float` | No | Effective price (max_bid or price) in EUR |
| `has_gmb` | `Boolean` | No | Has active Google Business Profile |
| `id` | `Integer` | Yes | Unique domain identifier |
| `language` | `String` | No | Detected content language (e.g., EN, FR, DE) |
| `max_bid` | `Float` | No | Current highest bid in EUR |
| `name` | `String` | Yes | Domain name |
| `pagerank` | `Integer` | No | Historical PageRank value |
| `price` | `Float` | No | Starting price or buy-now price in EUR |
| `purchase_url` | `String` | No | Direct URL to purchase or bid on the domain |
| `referring_domains` | `Integer` | No | Number of unique referring domains |
| `score` | `Integer` | Yes | CatchDoms quality score (0-100) |
| `source` | `String` | Yes | Platform source (e.g., godaddy, dropcatch, regfree) |
| `tld` | `String` | Yes | Top-level domain extension |
| `topical_trust_flow` | `String` | No | Majestic Topical Trust Flow category |
| `trust_flow` | `Integer` | No | Majestic Trust Flow score (0-100) |
| `type` | `String` | No | Domain listing type |
| `wayback_first_date` | `String` | No | Date of first Wayback snapshot |
| `wayback_snapshots` | `Integer` | No | Number of Wayback Machine snapshots |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Domain.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DomainEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## McpEntity

```ruby
mcp = client.Mcp
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `capabilities` | `Array` | No |  |
| `server` | `String` | No |  |
| `version` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Mcp.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `McpEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PendingDeleteEntity

```ruby
pending_delete = client.PendingDelete
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `age` | `Integer` | No | Years since first Wayback snapshot |
| `backlinks_count` | `Integer` | No | Total number of backlinks |
| `days_until_drop` | `Integer` | No | Days until predicted drop date |
| `id` | `Integer` | Yes | Unique domain identifier |
| `name` | `String` | Yes | Domain name |
| `predicted_drop_date` | `String` | Yes | Predicted drop date (YYYY-MM-DD) |
| `referring_domains` | `Integer` | No | Number of unique referring domains |
| `score` | `Integer` | No | CatchDoms quality score (0-100) |
| `status` | `String` | Yes | Current domain status |
| `tld` | `String` | Yes | Top-level domain extension |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.PendingDelete.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PendingDeleteEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = CatchdomsSecuritySDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

