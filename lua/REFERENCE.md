# CatchdomsSecurity Lua SDK Reference

Complete API reference for the CatchdomsSecurity Lua SDK.


## CatchdomsSecuritySDK

### Constructor

```lua
local sdk = require("catchdoms-security_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Domain(data)`

Create a new `Domain` entity instance. Pass `nil` for no initial data.

#### `Mcp(data)`

Create a new `Mcp` entity instance. Pass `nil` for no initial data.

#### `PendingDelete(data)`

Create a new `PendingDelete` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## DomainEntity

```lua
local domain = client:Domain(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `age` | `number` | No | Years since first Wayback snapshot |
| `auction_end_date` | `string` | No | Auction end date and time (ISO 8601) |
| `backlinks_count` | `number` | No | Total number of backlinks |
| `bids_count` | `number` | No | Number of bids |
| `citation_flow` | `number` | No | Majestic Citation Flow score (0-100) |
| `domain_authority` | `number` | No | Moz Domain Authority score (0-100) |
| `edu_gov_backlinks` | `number` | No | Number of EDU/GOV backlinks |
| `effective_price` | `number` | No | Effective price (max_bid or price) in EUR |
| `has_gmb` | `boolean` | No | Has active Google Business Profile |
| `id` | `number` | Yes | Unique domain identifier |
| `language` | `string` | No | Detected content language (e.g., EN, FR, DE) |
| `max_bid` | `number` | No | Current highest bid in EUR |
| `name` | `string` | Yes | Domain name |
| `pagerank` | `number` | No | Historical PageRank value |
| `price` | `number` | No | Starting price or buy-now price in EUR |
| `purchase_url` | `string` | No | Direct URL to purchase or bid on the domain |
| `referring_domains` | `number` | No | Number of unique referring domains |
| `score` | `number` | Yes | CatchDoms quality score (0-100) |
| `source` | `string` | Yes | Platform source (e.g., godaddy, dropcatch, regfree) |
| `tld` | `string` | Yes | Top-level domain extension |
| `topical_trust_flow` | `string` | No | Majestic Topical Trust Flow category |
| `trust_flow` | `number` | No | Majestic Trust Flow score (0-100) |
| `type` | `string` | No | Domain listing type |
| `wayback_first_date` | `string` | No | Date of first Wayback snapshot |
| `wayback_snapshots` | `number` | No | Number of Wayback Machine snapshots |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Domain():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## McpEntity

```lua
local mcp = client:Mcp(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `capabilities` | `table` | No |  |
| `server` | `string` | No |  |
| `version` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Mcp():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `McpEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PendingDeleteEntity

```lua
local pending_delete = client:PendingDelete(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `age` | `number` | No | Years since first Wayback snapshot |
| `backlinks_count` | `number` | No | Total number of backlinks |
| `days_until_drop` | `number` | No | Days until predicted drop date |
| `id` | `number` | Yes | Unique domain identifier |
| `name` | `string` | Yes | Domain name |
| `predicted_drop_date` | `string` | Yes | Predicted drop date (YYYY-MM-DD) |
| `referring_domains` | `number` | No | Number of unique referring domains |
| `score` | `number` | No | CatchDoms quality score (0-100) |
| `status` | `string` | Yes | Current domain status |
| `tld` | `string` | Yes | Top-level domain extension |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:PendingDelete():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PendingDeleteEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
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

