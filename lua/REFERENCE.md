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
| `age` | `number` | No |  |
| `auction_end_date` | `string` | No |  |
| `backlinks_count` | `number` | No |  |
| `bids_count` | `number` | No |  |
| `citation_flow` | `number` | No |  |
| `domain_authority` | `number` | No |  |
| `edu_gov_backlink` | `number` | No |  |
| `effective_price` | `number` | No |  |
| `has_gmb` | `boolean` | No |  |
| `id` | `number` | Yes |  |
| `language` | `string` | No |  |
| `max_bid` | `number` | No |  |
| `name` | `string` | Yes |  |
| `pagerank` | `number` | No |  |
| `price` | `number` | No |  |
| `purchase_url` | `string` | No |  |
| `referring_domain` | `number` | No |  |
| `score` | `number` | Yes |  |
| `source` | `string` | Yes |  |
| `tld` | `string` | Yes |  |
| `topical_trust_flow` | `string` | No |  |
| `trust_flow` | `number` | No |  |
| `type` | `string` | No |  |
| `wayback_first_date` | `string` | No |  |
| `wayback_snapshot` | `number` | No |  |

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
| `capability` | `table` | No |  |
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
| `age` | `number` | No |  |
| `backlinks_count` | `number` | No |  |
| `days_until_drop` | `number` | No |  |
| `id` | `number` | Yes |  |
| `name` | `string` | Yes |  |
| `predicted_drop_date` | `string` | Yes |  |
| `referring_domain` | `number` | No |  |
| `score` | `number` | No |  |
| `status` | `string` | Yes |  |
| `tld` | `string` | Yes |  |

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

