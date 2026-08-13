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
| `age` | `int` | No |  |
| `auction_end_date` | `str` | No |  |
| `backlinks_count` | `int` | No |  |
| `bids_count` | `int` | No |  |
| `citation_flow` | `int` | No |  |
| `domain_authority` | `int` | No |  |
| `edu_gov_backlinks` | `int` | No |  |
| `effective_price` | `float` | No |  |
| `has_gmb` | `bool` | No |  |
| `id` | `int` | Yes |  |
| `language` | `str` | No |  |
| `max_bid` | `float` | No |  |
| `name` | `str` | Yes |  |
| `pagerank` | `int` | No |  |
| `price` | `float` | No |  |
| `purchase_url` | `str` | No |  |
| `referring_domains` | `int` | No |  |
| `score` | `int` | Yes |  |
| `source` | `str` | Yes |  |
| `tld` | `str` | Yes |  |
| `topical_trust_flow` | `str` | No |  |
| `trust_flow` | `int` | No |  |
| `type` | `str` | No |  |
| `wayback_first_date` | `str` | No |  |
| `wayback_snapshots` | `int` | No |  |

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
| `age` | `int` | No |  |
| `backlinks_count` | `int` | No |  |
| `days_until_drop` | `int` | No |  |
| `id` | `int` | Yes |  |
| `name` | `str` | Yes |  |
| `predicted_drop_date` | `str` | Yes |  |
| `referring_domains` | `int` | No |  |
| `score` | `int` | No |  |
| `status` | `str` | Yes |  |
| `tld` | `str` | Yes |  |

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

