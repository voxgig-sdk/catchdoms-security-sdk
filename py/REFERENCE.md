# CatchdomsSecurity Python SDK Reference

Complete API reference for the CatchdomsSecurity Python SDK.


## CatchdomsSecuritySDK

### Constructor

```python
from catchdomssecurity_sdk import CatchdomsSecuritySDK

client = CatchdomsSecuritySDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CatchdomsSecuritySDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = CatchdomsSecuritySDK.test()
```


### Instance Methods

#### `Domain(data=None)`

Create a new `DomainEntity` instance. Pass `None` for no initial data.

#### `Mcp(data=None)`

Create a new `McpEntity` instance. Pass `None` for no initial data.

#### `PendingDelete(data=None)`

Create a new `PendingDeleteEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## DomainEntity

```python
domain = client.Domain()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `age` | `int` | No | Years since first Wayback snapshot |
| `auction_end_date` | `str` | No | Auction end date and time (ISO 8601) |
| `backlinks_count` | `int` | No | Total number of backlinks |
| `bids_count` | `int` | No | Number of bids |
| `citation_flow` | `int` | No | Majestic Citation Flow score (0-100) |
| `domain_authority` | `int` | No | Moz Domain Authority score (0-100) |
| `edu_gov_backlinks` | `int` | No | Number of EDU/GOV backlinks |
| `effective_price` | `float` | No | Effective price (max_bid or price) in EUR |
| `has_gmb` | `bool` | No | Has active Google Business Profile |
| `id` | `int` | Yes | Unique domain identifier |
| `language` | `str` | No | Detected content language (e.g., EN, FR, DE) |
| `max_bid` | `float` | No | Current highest bid in EUR |
| `name` | `str` | Yes | Domain name |
| `pagerank` | `int` | No | Historical PageRank value |
| `price` | `float` | No | Starting price or buy-now price in EUR |
| `purchase_url` | `str` | No | Direct URL to purchase or bid on the domain |
| `referring_domains` | `int` | No | Number of unique referring domains |
| `score` | `int` | Yes | CatchDoms quality score (0-100) |
| `source` | `str` | Yes | Platform source (e.g., godaddy, dropcatch, regfree) |
| `tld` | `str` | Yes | Top-level domain extension |
| `topical_trust_flow` | `str` | No | Majestic Topical Trust Flow category |
| `trust_flow` | `int` | No | Majestic Trust Flow score (0-100) |
| `type` | `str` | No | Domain listing type |
| `wayback_first_date` | `str` | No | Date of first Wayback snapshot |
| `wayback_snapshots` | `int` | No | Number of Wayback Machine snapshots |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Domain().list()
for domain in results:
    print(domain)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## McpEntity

```python
mcp = client.Mcp()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `capabilities` | `list` | No |  |
| `server` | `str` | No |  |
| `version` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Mcp().list()
for mcp in results:
    print(mcp)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `McpEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PendingDeleteEntity

```python
pending_delete = client.PendingDelete()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `age` | `int` | No | Years since first Wayback snapshot |
| `backlinks_count` | `int` | No | Total number of backlinks |
| `days_until_drop` | `int` | No | Days until predicted drop date |
| `id` | `int` | Yes | Unique domain identifier |
| `name` | `str` | Yes | Domain name |
| `predicted_drop_date` | `str` | Yes | Predicted drop date (YYYY-MM-DD) |
| `referring_domains` | `int` | No | Number of unique referring domains |
| `score` | `int` | No | CatchDoms quality score (0-100) |
| `status` | `str` | Yes | Current domain status |
| `tld` | `str` | Yes | Top-level domain extension |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.PendingDelete().list()
for pending_delete in results:
    print(pending_delete)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PendingDeleteEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = CatchdomsSecuritySDK({
    "feature": {
        "test": {"active": True},
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

