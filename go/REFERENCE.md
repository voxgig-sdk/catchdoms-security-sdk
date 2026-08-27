# CatchdomsSecurity Golang SDK Reference

Complete API reference for the CatchdomsSecurity Golang SDK.


## CatchdomsSecuritySDK

### Constructor

```go
func NewCatchdomsSecuritySDK(options map[string]any) *CatchdomsSecuritySDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *CatchdomsSecuritySDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *CatchdomsSecuritySDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Domain(data map[string]any) CatchdomsSecurityEntity`

Create a new `Domain` entity instance. Pass `nil` for no initial data.

#### `Mcp(data map[string]any) CatchdomsSecurityEntity`

Create a new `Mcp` entity instance. Pass `nil` for no initial data.

#### `PendingDelete(data map[string]any) CatchdomsSecurityEntity`

Create a new `PendingDelete` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## DomainEntity

```go
domain := client.Domain(nil)
fmt.Println(domain.GetName()) // "domain"
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
| `effective_price` | `float64` | No | Effective price (max_bid or price) in EUR |
| `has_gmb` | `bool` | No | Has active Google Business Profile |
| `id` | `int` | Yes | Unique domain identifier |
| `language` | `string` | No | Detected content language (e.g., EN, FR, DE) |
| `max_bid` | `float64` | No | Current highest bid in EUR |
| `name` | `string` | Yes | Domain name |
| `pagerank` | `int` | No | Historical PageRank value |
| `price` | `float64` | No | Starting price or buy-now price in EUR |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Domain(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DomainEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## McpEntity

```go
mcp := client.Mcp(nil)
fmt.Println(mcp.GetName()) // "mcp"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `capabilities` | `[]any` | No |  |
| `server` | `string` | No |  |
| `version` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Mcp(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `McpEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PendingDeleteEntity

```go
pendingDelete := client.PendingDelete(nil)
fmt.Println(pendingDelete.GetName()) // "pending_delete"
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.PendingDelete(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PendingDeleteEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewCatchdomsSecuritySDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
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

