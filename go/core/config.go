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
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "auction_end_date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "backlinks_count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "bids_count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "citation_flow",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "domain_authority",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "edu_gov_backlinks",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "effective_price",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "has_gmb",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "language",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "max_bid",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "pagerank",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "price",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "purchase_url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "referring_domains",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "score",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "source",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tld",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "topical_trust_flow",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "trust_flow",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "wayback_first_date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "wayback_snapshots",
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
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "backlinks_count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "days_until_drop",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "predicted_drop_date",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "referring_domains",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "score",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "status",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tld",
						"req": true,
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
