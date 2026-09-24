# CatchdomsSecurity SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "CatchdomsSecurity",
            "slug": "catchdoms-security",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://catchdoms.com",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "domain": {},
                "mcp": {},
                "pending_delete": {},
            },
        },
        "entity": {
      "domain": {
        "fields": [
          {
            "name": "age",
            "title": "Age",
            "type": "`$INTEGER`",
            "short": "Years since first Wayback snapshot",
          },
          {
            "name": "auction_end_date",
            "title": "Auction End Date",
            "type": "`$STRING`",
            "short": "Auction end date and time (ISO 8601)",
            "format": "date-time",
          },
          {
            "name": "backlinks_count",
            "title": "Backlinks Count",
            "type": "`$INTEGER`",
            "short": "Total number of backlinks",
          },
          {
            "name": "bids_count",
            "title": "Bids Count",
            "type": "`$INTEGER`",
            "short": "Number of bids",
          },
          {
            "name": "citation_flow",
            "title": "Citation Flow",
            "type": "`$INTEGER`",
            "short": "Majestic Citation Flow score (0-100)",
          },
          {
            "name": "domain_authority",
            "title": "Domain Authority",
            "type": "`$INTEGER`",
            "short": "Moz Domain Authority score (0-100)",
          },
          {
            "name": "edu_gov_backlinks",
            "title": "Edu Gov Backlinks",
            "type": "`$INTEGER`",
            "short": "Number of EDU/GOV backlinks",
          },
          {
            "name": "effective_price",
            "title": "Effective Price",
            "type": "`$NUMBER`",
            "short": "Effective price (max_bid or price) in EUR",
            "format": "float",
          },
          {
            "name": "has_gmb",
            "title": "Has Gmb",
            "type": "`$BOOLEAN`",
            "short": "Has active Google Business Profile",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Unique domain identifier",
          },
          {
            "name": "language",
            "title": "Language",
            "type": "`$STRING`",
            "short": "Detected content language (e.g., EN, FR, DE)",
          },
          {
            "name": "max_bid",
            "title": "Max Bid",
            "type": "`$NUMBER`",
            "short": "Current highest bid in EUR",
            "format": "float",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
            "short": "Domain name",
          },
          {
            "name": "pagerank",
            "title": "Pagerank",
            "type": "`$INTEGER`",
            "short": "Historical PageRank value",
          },
          {
            "name": "price",
            "title": "Price",
            "type": "`$NUMBER`",
            "short": "Starting price or buy-now price in EUR",
            "format": "float",
          },
          {
            "name": "purchase_url",
            "title": "Purchase Url",
            "type": "`$STRING`",
            "short": "Direct URL to purchase or bid on the domain",
            "format": "uri",
          },
          {
            "name": "referring_domains",
            "title": "Referring Domains",
            "type": "`$INTEGER`",
            "short": "Number of unique referring domains",
          },
          {
            "name": "score",
            "title": "Score",
            "type": "`$INTEGER`",
            "req": True,
            "short": "CatchDoms quality score (0-100)",
          },
          {
            "name": "source",
            "title": "Source",
            "type": "`$STRING`",
            "req": True,
            "short": "Platform source (e.g., godaddy, dropcatch, regfree)",
          },
          {
            "name": "tld",
            "title": "Tld",
            "type": "`$STRING`",
            "req": True,
            "short": "Top-level domain extension",
          },
          {
            "name": "topical_trust_flow",
            "title": "Topical Trust Flow",
            "type": "`$STRING`",
            "short": "Majestic Topical Trust Flow category",
          },
          {
            "name": "trust_flow",
            "title": "Trust Flow",
            "type": "`$INTEGER`",
            "short": "Majestic Trust Flow score (0-100)",
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
            "short": "Domain listing type",
          },
          {
            "name": "wayback_first_date",
            "title": "Wayback First Date",
            "type": "`$STRING`",
            "short": "Date of first Wayback snapshot",
            "format": "date",
          },
          {
            "name": "wayback_snapshots",
            "title": "Wayback Snapshots",
            "type": "`$INTEGER`",
            "short": "Number of Wayback Machine snapshots",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "domain",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/domains",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "domains",
                  },
                ],
                "parts": [
                  "api",
                  "domains",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "age_min",
                      "orig": "age_min",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "category",
                      "orig": "category",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "Business,Health",
                    },
                    {
                      "name": "cf_min",
                      "orig": "cf_min",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "contain",
                      "orig": "contain",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "da_min",
                      "orig": "da_min",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "has_backlink",
                      "orig": "has_backlink",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "has_bid",
                      "orig": "has_bid",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "has_edu_gov",
                      "orig": "has_edu_gov",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "has_gmb",
                      "orig": "has_gmb",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "language",
                      "orig": "language",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "EN",
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 10,
                    },
                    {
                      "name": "price_max",
                      "orig": "price_max",
                      "type": "`$NUMBER`",
                      "kind": "query",
                    },
                    {
                      "name": "price_min",
                      "orig": "price_min",
                      "type": "`$NUMBER`",
                      "kind": "query",
                    },
                    {
                      "name": "rd_min",
                      "orig": "rd_min",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "score_min",
                      "orig": "score_min",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "snapshots_min",
                      "orig": "snapshots_min",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "source",
                      "orig": "source",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "tf_min",
                      "orig": "tf_min",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "tld",
                      "orig": "tld",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": ".com",
                    },
                    {
                      "name": "type",
                      "orig": "type",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "age_min",
                    "category",
                    "cf_min",
                    "contain",
                    "da_min",
                    "has_backlink",
                    "has_bid",
                    "has_edu_gov",
                    "has_gmb",
                    "language",
                    "page",
                    "per_page",
                    "price_max",
                    "price_min",
                    "rd_min",
                    "score_min",
                    "snapshots_min",
                    "source",
                    "tf_min",
                    "tld",
                    "type",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "mcp": {
        "fields": [],
        "name": "mcp",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/mcp/catchdoms",
                "segments": [
                  {
                    "lit": "mcp",
                  },
                  {
                    "lit": "catchdoms",
                  },
                ],
                "parts": [
                  "mcp",
                  "catchdoms",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.capabilities`",
                },
                "args": {},
                "select": {
                  "$action": "catchdom",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "pending_delete": {
        "fields": [
          {
            "name": "age",
            "title": "Age",
            "type": "`$INTEGER`",
            "short": "Years since first Wayback snapshot",
          },
          {
            "name": "backlinks_count",
            "title": "Backlinks Count",
            "type": "`$INTEGER`",
            "short": "Total number of backlinks",
          },
          {
            "name": "days_until_drop",
            "title": "Days Until Drop",
            "type": "`$INTEGER`",
            "short": "Days until predicted drop date",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Unique domain identifier",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
            "short": "Domain name",
          },
          {
            "name": "predicted_drop_date",
            "title": "Predicted Drop Date",
            "type": "`$STRING`",
            "req": True,
            "short": "Predicted drop date (YYYY-MM-DD)",
            "format": "date",
          },
          {
            "name": "referring_domains",
            "title": "Referring Domains",
            "type": "`$INTEGER`",
            "short": "Number of unique referring domains",
          },
          {
            "name": "score",
            "title": "Score",
            "type": "`$INTEGER`",
            "short": "CatchDoms quality score (0-100)",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "req": True,
            "short": "Current domain status",
          },
          {
            "name": "tld",
            "title": "Tld",
            "type": "`$STRING`",
            "req": True,
            "short": "Top-level domain extension",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "pending_delete",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/pending-delete",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "pending-delete",
                  },
                ],
                "parts": [
                  "api",
                  "pending-delete",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "drop_date_max",
                      "orig": "drop_date_max",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "drop_date_min",
                      "orig": "drop_date_min",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 10,
                    },
                    {
                      "name": "status",
                      "orig": "status",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "tld",
                      "orig": "tld",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "drop_date_max",
                    "drop_date_min",
                    "page",
                    "per_page",
                    "status",
                    "tld",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
