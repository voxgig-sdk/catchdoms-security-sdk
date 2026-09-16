# Catchdoms Security API

This API provides security verification to protect websites from malicious bots. It displays a challenge page while validating that the user is not a bot, ensuring secure access to the site. The API also provides access to expired domains, live auctions, deleted ccTLD domains, and pending-delete inventory with SEO metrics.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 3 entities and 3 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Domain

Results: Successful response with domain data.

SDK operations: `list`.

Key fields to recognise:

- `age`: Years since first Wayback snapshot
- `auction_end_date`: Auction end date and time (ISO 8601)
- `backlinks_count`: Total number of backlinks
- `bids_count`: Number of bids
- `citation_flow`: Majestic Citation Flow score (0-100)

### Mcp

Results: MCP server endpoint active.

SDK operations: `list`.

### PendingDelete

Results: Successful response with pending-delete domain data.

SDK operations: `list`.

Key fields to recognise:

- `age`: Years since first Wayback snapshot
- `backlinks_count`: Total number of backlinks
- `days_until_drop`: Days until predicted drop date
- `id`: Unique domain identifier
- `name`: Domain name

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Domain | `list` | `GET /api/domains` | Not required |
| Mcp | `list` | `GET /mcp/catchdoms` | Required |
| PendingDelete | `list` | `GET /api/pending-delete` | Required |

## Connect to the API

- Production server: `https://catchdoms.com`

The default credential is sent in the `Authorization` header with the `Bearer` prefix.

Bearer token authentication. Add &#39;Authorization: Bearer YOUR_API_KEY&#39; header. Get your API key from the API dashboard at https://catchdoms.com/api

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

A read request without required parameters or authentication is `GET /api/domains`. For example:

```sh
curl --fail-with-body --silent --show-error 'https://catchdoms.com/api/domains'
```

Inspect the response using the Domain reference. This checks the public route; authenticated operations need their own credentials and request data.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `catchdoms-security_list`: List records for an entity. Supported entities: `domain`, `mcp`, `pending_delete`.
- `catchdoms-security_load`: Load one record for an entity. No active entity supports this operation.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

