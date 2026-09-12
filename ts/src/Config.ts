
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'CatchdomsSecurity',
        slug: "catchdoms-security",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://catchdoms.com",

    auth: {
      prefix: 'Bearer',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      domain: {
      },

      mcp: {
      },

      pending_delete: {
      },

    }
  }


  entity = {
    "domain": {
      "fields": [
        {
          "name": "age",
          "short": "Years since first Wayback snapshot",
          "type": "`$INTEGER`"
        },
        {
          "format": "date-time",
          "name": "auction_end_date",
          "short": "Auction end date and time (ISO 8601)",
          "type": "`$STRING`"
        },
        {
          "name": "backlinks_count",
          "short": "Total number of backlinks",
          "type": "`$INTEGER`"
        },
        {
          "name": "bids_count",
          "short": "Number of bids",
          "type": "`$INTEGER`"
        },
        {
          "name": "citation_flow",
          "short": "Majestic Citation Flow score (0-100)",
          "type": "`$INTEGER`"
        },
        {
          "name": "domain_authority",
          "short": "Moz Domain Authority score (0-100)",
          "type": "`$INTEGER`"
        },
        {
          "name": "edu_gov_backlinks",
          "short": "Number of EDU/GOV backlinks",
          "type": "`$INTEGER`"
        },
        {
          "format": "float",
          "name": "effective_price",
          "short": "Effective price (max_bid or price) in EUR",
          "type": "`$NUMBER`"
        },
        {
          "name": "has_gmb",
          "short": "Has active Google Business Profile",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "id",
          "req": true,
          "short": "Unique domain identifier",
          "type": "`$INTEGER`"
        },
        {
          "name": "language",
          "short": "Detected content language (e.g., EN, FR, DE)",
          "type": "`$STRING`"
        },
        {
          "format": "float",
          "name": "max_bid",
          "short": "Current highest bid in EUR",
          "type": "`$NUMBER`"
        },
        {
          "name": "name",
          "req": true,
          "short": "Domain name",
          "type": "`$STRING`"
        },
        {
          "name": "pagerank",
          "short": "Historical PageRank value",
          "type": "`$INTEGER`"
        },
        {
          "format": "float",
          "name": "price",
          "short": "Starting price or buy-now price in EUR",
          "type": "`$NUMBER`"
        },
        {
          "format": "uri",
          "name": "purchase_url",
          "short": "Direct URL to purchase or bid on the domain",
          "type": "`$STRING`"
        },
        {
          "name": "referring_domains",
          "short": "Number of unique referring domains",
          "type": "`$INTEGER`"
        },
        {
          "name": "score",
          "req": true,
          "short": "CatchDoms quality score (0-100)",
          "type": "`$INTEGER`"
        },
        {
          "name": "source",
          "req": true,
          "short": "Platform source (e.g., godaddy, dropcatch, regfree)",
          "type": "`$STRING`"
        },
        {
          "name": "tld",
          "req": true,
          "short": "Top-level domain extension",
          "type": "`$STRING`"
        },
        {
          "name": "topical_trust_flow",
          "short": "Majestic Topical Trust Flow category",
          "type": "`$STRING`"
        },
        {
          "name": "trust_flow",
          "short": "Majestic Trust Flow score (0-100)",
          "type": "`$INTEGER`"
        },
        {
          "name": "type",
          "short": "Domain listing type",
          "type": "`$STRING`"
        },
        {
          "format": "date",
          "name": "wayback_first_date",
          "short": "Date of first Wayback snapshot",
          "type": "`$STRING`"
        },
        {
          "name": "wayback_snapshots",
          "short": "Number of Wayback Machine snapshots",
          "type": "`$INTEGER`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "domain",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "age_min",
                    "orig": "age_min",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "Business,Health",
                    "kind": "query",
                    "name": "category",
                    "orig": "category",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "cf_min",
                    "orig": "cf_min",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "contain",
                    "orig": "contain",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "da_min",
                    "orig": "da_min",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "has_backlink",
                    "orig": "has_backlink",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "has_bid",
                    "orig": "has_bid",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "has_edu_gov",
                    "orig": "has_edu_gov",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "has_gmb",
                    "orig": "has_gmb",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "EN",
                    "kind": "query",
                    "name": "language",
                    "orig": "language",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 10,
                    "kind": "query",
                    "name": "per_page",
                    "orig": "per_page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "price_max",
                    "orig": "price_max",
                    "type": "`$NUMBER`"
                  },
                  {
                    "kind": "query",
                    "name": "price_min",
                    "orig": "price_min",
                    "type": "`$NUMBER`"
                  },
                  {
                    "kind": "query",
                    "name": "rd_min",
                    "orig": "rd_min",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "score_min",
                    "orig": "score_min",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "snapshots_min",
                    "orig": "snapshots_min",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "source",
                    "orig": "source",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "tf_min",
                    "orig": "tf_min",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": ".com",
                    "kind": "query",
                    "name": "tld",
                    "orig": "tld",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "type",
                    "orig": "type",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/domains",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "domains"
                }
              ],
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
                  "type"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "domains"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "mcp": {
      "fields": [
        {
          "name": "capabilities",
          "type": "`$ARRAY`"
        },
        {
          "name": "server",
          "type": "`$STRING`"
        },
        {
          "name": "version",
          "type": "`$STRING`"
        }
      ],
      "name": "mcp",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/mcp/catchdoms",
              "segments": [
                {
                  "lit": "mcp"
                },
                {
                  "lit": "catchdoms"
                }
              ],
              "select": {
                "$action": "catchdom"
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.capabilities`"
              },
              "parts": [
                "mcp",
                "catchdoms"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "pending_delete": {
      "fields": [
        {
          "name": "age",
          "short": "Years since first Wayback snapshot",
          "type": "`$INTEGER`"
        },
        {
          "name": "backlinks_count",
          "short": "Total number of backlinks",
          "type": "`$INTEGER`"
        },
        {
          "name": "days_until_drop",
          "short": "Days until predicted drop date",
          "type": "`$INTEGER`"
        },
        {
          "name": "id",
          "req": true,
          "short": "Unique domain identifier",
          "type": "`$INTEGER`"
        },
        {
          "name": "name",
          "req": true,
          "short": "Domain name",
          "type": "`$STRING`"
        },
        {
          "format": "date",
          "name": "predicted_drop_date",
          "req": true,
          "short": "Predicted drop date (YYYY-MM-DD)",
          "type": "`$STRING`"
        },
        {
          "name": "referring_domains",
          "short": "Number of unique referring domains",
          "type": "`$INTEGER`"
        },
        {
          "name": "score",
          "short": "CatchDoms quality score (0-100)",
          "type": "`$INTEGER`"
        },
        {
          "name": "status",
          "req": true,
          "short": "Current domain status",
          "type": "`$STRING`"
        },
        {
          "name": "tld",
          "req": true,
          "short": "Top-level domain extension",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "pending_delete",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "drop_date_max",
                    "orig": "drop_date_max",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "drop_date_min",
                    "orig": "drop_date_min",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 10,
                    "kind": "query",
                    "name": "per_page",
                    "orig": "per_page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "status",
                    "orig": "status",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "tld",
                    "orig": "tld",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/pending-delete",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "pending-delete"
                }
              ],
              "select": {
                "exist": [
                  "drop_date_max",
                  "drop_date_min",
                  "page",
                  "per_page",
                  "status",
                  "tld"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "pending-delete"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

