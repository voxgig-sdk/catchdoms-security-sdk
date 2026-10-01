"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "domain",
        "accessor": "Domain",
        "op": "list",
        "method": "GET",
        "path": "/api/domains",
        "args": [],
        "select": {
            "age_min": "v1",
            "category": "v1",
            "cf_min": "v1",
            "contain": "v1",
            "da_min": "v1",
            "has_backlink": "v1",
            "has_bid": "v1",
            "has_edu_gov": "v1",
            "has_gmb": "v1",
            "language": "EN",
            "page": "v1",
            "per_page": "v1",
            "price_max": "v1",
            "price_min": "v1",
            "rd_min": "v1",
            "score_min": "v1",
            "snapshots_min": "v1",
            "source": "v1",
            "tf_min": "v1",
            "tld": ".com",
            "type": "v1"
        },
        "headers": [],
        "query": [
            "source",
            "tld",
            "score_min",
            "age_min",
            "type",
            "has_bids",
            "has_backlinks",
            "has_gmb",
            "has_edu_gov",
            "tf_min",
            "cf_min",
            "da_min",
            "rd_min",
            "categories",
            "contains",
            "language",
            "price_min",
            "price_max",
            "snapshots_min",
            "per_page",
            "page"
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "data": [
                {
                    "id": 12345,
                    "name": "example.com",
                    "tld": ".com",
                    "source": "godaddy",
                    "type": "auction",
                    "price": 12,
                    "max_bid": 125,
                    "effective_price": 125,
                    "bids_count": 8,
                    "auction_end_date": "2026-01-25T18:00:00Z",
                    "score": 72,
                    "age": 15,
                    "pagerank": 4,
                    "domain_authority": 28,
                    "backlinks_count": 1420,
                    "referring_domains": 89,
                    "wayback_snapshots": 156,
                    "wayback_first_date": "2011-03-14",
                    "language": "EN",
                    "purchase_url": "https://auctions.godaddy.com/..."
                }
            ],
            "links": {
                "first": "https://catchdoms.com/api/domains?page=1",
                "last": "https://catchdoms.com/api/domains?page=342",
                "prev": null,
                "next": "https://catchdoms.com/api/domains?page=2"
            },
            "meta": {
                "current_page": 1,
                "total": 3420
            }
        },
        "idField": "id"
    },
    {
        "entity": "mcp",
        "accessor": "Mcp",
        "op": "list",
        "method": "GET",
        "path": "/mcp/catchdoms",
        "action": "catchdom",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "server": "x",
            "version": "x",
            "capabilities": [
                "x"
            ]
        },
        "idField": "id"
    },
    {
        "entity": "pending_delete",
        "accessor": "PendingDelete",
        "op": "list",
        "method": "GET",
        "path": "/api/pending-delete",
        "args": [],
        "select": {
            "drop_date_max": "v1",
            "drop_date_min": "v1",
            "page": "v1",
            "per_page": "v1",
            "status": "v1",
            "tld": "v1"
        },
        "headers": [],
        "query": [
            "status",
            "tld",
            "drop_date_min",
            "drop_date_max",
            "per_page",
            "page"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "age": 1,
                    "backlinks_count": 1,
                    "days_until_drop": 1,
                    "id": 1,
                    "name": "x",
                    "predicted_drop_date": "2026-01-01",
                    "referring_domains": 1,
                    "score": 1,
                    "status": "pendingDelete",
                    "tld": "x"
                }
            ],
            "links": {
                "first": "x",
                "last": "x",
                "next": "x",
                "prev": "x"
            },
            "meta": {
                "current_page": 1,
                "total": 1
            }
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map