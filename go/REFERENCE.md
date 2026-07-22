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
| `age` | `int` | No |  |
| `auction_end_date` | `string` | No |  |
| `backlinks_count` | `int` | No |  |
| `bids_count` | `int` | No |  |
| `citation_flow` | `int` | No |  |
| `domain_authority` | `int` | No |  |
| `edu_gov_backlink` | `int` | No |  |
| `effective_price` | `float64` | No |  |
| `has_gmb` | `bool` | No |  |
| `id` | `int` | Yes |  |
| `language` | `string` | No |  |
| `max_bid` | `float64` | No |  |
| `name` | `string` | Yes |  |
| `pagerank` | `int` | No |  |
| `price` | `float64` | No |  |
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
| `capability` | `[]any` | No |  |
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

