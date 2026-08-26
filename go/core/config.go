package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "CatchdomsSecurity",
			"slug": "catchdoms-security",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://catchdoms.com",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"domain": map[string]any{},
				"mcp": map[string]any{},
				"pending_delete": map[string]any{},
			},
		},
		"entity": map[string]any{
			"domain": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "age",
						"short": "Years since first Wayback snapshot",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "auction_end_date",
						"short": "Auction end date and time (ISO 8601)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "backlinks_count",
						"short": "Total number of backlinks",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "bids_count",
						"short": "Number of bids",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "citation_flow",
						"short": "Majestic Citation Flow score (0-100)",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "domain_authority",
						"short": "Moz Domain Authority score (0-100)",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "edu_gov_backlinks",
						"short": "Number of EDU/GOV backlinks",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "effective_price",
						"short": "Effective price (max_bid or price) in EUR",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "has_gmb",
						"short": "Has active Google Business Profile",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"short": "Unique domain identifier",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "language",
						"short": "Detected content language (e.g., EN, FR, DE)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "max_bid",
						"short": "Current highest bid in EUR",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"short": "Domain name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "pagerank",
						"short": "Historical PageRank value",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "price",
						"short": "Starting price or buy-now price in EUR",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "purchase_url",
						"short": "Direct URL to purchase or bid on the domain",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "referring_domains",
						"short": "Number of unique referring domains",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "score",
						"req": true,
						"short": "CatchDoms quality score (0-100)",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "source",
						"req": true,
						"short": "Platform source (e.g., godaddy, dropcatch, regfree)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tld",
						"req": true,
						"short": "Top-level domain extension",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "topical_trust_flow",
						"short": "Majestic Topical Trust Flow category",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "trust_flow",
						"short": "Majestic Trust Flow score (0-100)",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "type",
						"short": "Domain listing type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "wayback_first_date",
						"short": "Date of first Wayback snapshot",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "wayback_snapshots",
						"short": "Number of Wayback Machine snapshots",
						"type": "`$INTEGER`",
					},
				},
				"name": "domain",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "age_min",
											"orig": "age_min",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "Business,Health",
											"kind": "query",
											"name": "category",
											"orig": "category",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "cf_min",
											"orig": "cf_min",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "contain",
											"orig": "contain",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "da_min",
											"orig": "da_min",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "has_backlink",
											"orig": "has_backlink",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "has_bid",
											"orig": "has_bid",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "has_edu_gov",
											"orig": "has_edu_gov",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "has_gmb",
											"orig": "has_gmb",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "EN",
											"kind": "query",
											"name": "language",
											"orig": "language",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 10,
											"kind": "query",
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "price_max",
											"orig": "price_max",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"kind": "query",
											"name": "price_min",
											"orig": "price_min",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"kind": "query",
											"name": "rd_min",
											"orig": "rd_min",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "score_min",
											"orig": "score_min",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "snapshots_min",
											"orig": "snapshots_min",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "source",
											"orig": "source",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "tf_min",
											"orig": "tf_min",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": ".com",
											"kind": "query",
											"name": "tld",
											"orig": "tld",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/domains",
								"parts": []any{
									"api",
									"domains",
								},
								"select": map[string]any{
									"exist": []any{
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
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"mcp": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "capabilities",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "server",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "version",
						"type": "`$STRING`",
					},
				},
				"name": "mcp",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/mcp/catchdoms",
								"parts": []any{
									"mcp",
									"catchdoms",
								},
								"select": map[string]any{
									"$action": "catchdom",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.capabilities`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"pending_delete": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "age",
						"short": "Years since first Wayback snapshot",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "backlinks_count",
						"short": "Total number of backlinks",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "days_until_drop",
						"short": "Days until predicted drop date",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"short": "Unique domain identifier",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"short": "Domain name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "predicted_drop_date",
						"req": true,
						"short": "Predicted drop date (YYYY-MM-DD)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "referring_domains",
						"short": "Number of unique referring domains",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "score",
						"short": "CatchDoms quality score (0-100)",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "status",
						"req": true,
						"short": "Current domain status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tld",
						"req": true,
						"short": "Top-level domain extension",
						"type": "`$STRING`",
					},
				},
				"name": "pending_delete",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "drop_date_max",
											"orig": "drop_date_max",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "drop_date_min",
											"orig": "drop_date_min",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 10,
											"kind": "query",
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "status",
											"orig": "status",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "tld",
											"orig": "tld",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/pending-delete",
								"parts": []any{
									"api",
									"pending-delete",
								},
								"select": map[string]any{
									"exist": []any{
										"drop_date_max",
										"drop_date_min",
										"page",
										"per_page",
										"status",
										"tld",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
