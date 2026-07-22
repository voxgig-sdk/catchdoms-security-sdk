# CatchdomsSecurity TypeScript SDK Reference

Complete API reference for the CatchdomsSecurity TypeScript SDK.


## CatchdomsSecuritySDK

### Constructor

```ts
new CatchdomsSecuritySDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CatchdomsSecuritySDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = CatchdomsSecuritySDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `CatchdomsSecuritySDK` instance in test mode.


### Instance Methods

#### `Domain(data?: object)`

Create a new `Domain` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DomainEntity` instance.

#### `Mcp(data?: object)`

Create a new `Mcp` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `McpEntity` instance.

#### `PendingDelete(data?: object)`

Create a new `PendingDelete` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PendingDeleteEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `CatchdomsSecuritySDK.test()`.

**Returns:** `CatchdomsSecuritySDK` instance in test mode.


---

## DomainEntity

```ts
const domain = client.Domain()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Domain().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DomainEntity` instance with the same client and
options.

#### `client()`

Return the parent `CatchdomsSecuritySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## McpEntity

```ts
const mcp = client.Mcp()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `capability` | `any[]` | No |  |
| `server` | `string` | No |  |
| `version` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Mcp().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `McpEntity` instance with the same client and
options.

#### `client()`

Return the parent `CatchdomsSecuritySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PendingDeleteEntity

```ts
const pending_delete = client.PendingDelete()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.PendingDelete().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PendingDeleteEntity` instance with the same client and
options.

#### `client()`

Return the parent `CatchdomsSecuritySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new CatchdomsSecuritySDK({
  feature: {
    test: { active: true },
  }
})
```

