# CatchdomsSecurity Python SDK



The Python SDK for the CatchdomsSecurity API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Domain()` — each
carrying a small, uniform set of operations (`list`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/catchdoms-security-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from catchdomssecurity_sdk import CatchdomsSecuritySDK

client = CatchdomsSecuritySDK({
    "apikey": os.environ.get("CATCHDOMS_SECURITY_APIKEY"),
})
```

### 2. List domain records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    domains = client.Domain().list()
    for domain in domains:
        print(domain)
except Exception as err:
    print(f"list failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    mcps = client.Mcp().list()
    print(mcps)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = CatchdomsSecuritySDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
mcp = client.Mcp().list()
# mcp contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = CatchdomsSecuritySDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### CatchdomsSecuritySDK

```python
from catchdomssecurity_sdk import CatchdomsSecuritySDK

client = CatchdomsSecuritySDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = CatchdomsSecuritySDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### CatchdomsSecuritySDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
| `Domain` | `(data) -> DomainEntity` | Create a Domain entity instance. |
| `Mcp` | `(data) -> McpEntity` | Create a Mcp entity instance. |
| `PendingDelete` | `(data) -> PendingDeleteEntity` | Create a PendingDelete entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `domain = client.Domain()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `age` | `int` | Years since first Wayback snapshot |
| `auction_end_date` | `str` | Auction end date and time (ISO 8601) |
| `backlinks_count` | `int` | Total number of backlinks |
| `bids_count` | `int` | Number of bids |
| `citation_flow` | `int` | Majestic Citation Flow score (0-100) |
| `domain_authority` | `int` | Moz Domain Authority score (0-100) |
| `edu_gov_backlinks` | `int` | Number of EDU/GOV backlinks |
| `effective_price` | `float` | Effective price (max_bid or price) in EUR |
| `has_gmb` | `bool` | Has active Google Business Profile |
| `id` | `int` | Unique domain identifier |
| `language` | `str` | Detected content language (e.g., EN, FR, DE) |
| `max_bid` | `float` | Current highest bid in EUR |
| `name` | `str` | Domain name |
| `pagerank` | `int` | Historical PageRank value |
| `price` | `float` | Starting price or buy-now price in EUR |
| `purchase_url` | `str` | Direct URL to purchase or bid on the domain |
| `referring_domains` | `int` | Number of unique referring domains |
| `score` | `int` | CatchDoms quality score (0-100) |
| `source` | `str` | Platform source (e.g., godaddy, dropcatch, regfree) |
| `tld` | `str` | Top-level domain extension |
| `topical_trust_flow` | `str` | Majestic Topical Trust Flow category |
| `trust_flow` | `int` | Majestic Trust Flow score (0-100) |
| `type` | `str` | Domain listing type |
| `wayback_first_date` | `str` | Date of first Wayback snapshot |
| `wayback_snapshots` | `int` | Number of Wayback Machine snapshots |

#### Example: List

```python
domains = client.Domain().list()
```


### Mcp

Create an instance: `mcp = client.Mcp()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `capabilities` | `list` |  |
| `server` | `str` |  |
| `version` | `str` |  |

#### Example: List

```python
mcps = client.Mcp().list()
```


### PendingDelete

Create an instance: `pending_delete = client.PendingDelete()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `age` | `int` | Years since first Wayback snapshot |
| `backlinks_count` | `int` | Total number of backlinks |
| `days_until_drop` | `int` | Days until predicted drop date |
| `id` | `int` | Unique domain identifier |
| `name` | `str` | Domain name |
| `predicted_drop_date` | `str` | Predicted drop date (YYYY-MM-DD) |
| `referring_domains` | `int` | Number of unique referring domains |
| `score` | `int` | CatchDoms quality score (0-100) |
| `status` | `str` | Current domain status |
| `tld` | `str` | Top-level domain extension |

#### Example: List

```python
pending_deletes = client.PendingDelete().list()
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── catchdomssecurity_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`catchdomssecurity_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
mcp = client.Mcp()
mcp.list()

# mcp.data_get() now returns the mcp data from the last list
# mcp.match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
