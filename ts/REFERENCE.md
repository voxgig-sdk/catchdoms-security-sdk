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
| `capabilities` | `any[]` | No |  |
| `server` | `string` | No |  |
| `version` | `string` | No |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `catchdom` | `/mcp/catchdoms` | `client.Mcp().list({ $action: 'catchdom', ... })` |

An action returns that action's OWN response, which is not necessarily a
Mcp record — check the API definition for its shape.

```ts
const result = await client.Mcp().list({
  $action: 'catchdom',
  /* ...the action's own arguments */
})
```

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

