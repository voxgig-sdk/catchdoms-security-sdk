"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('PendingDeleteEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CATCHDOMS_SECURITY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CATCHDOMS_SECURITY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CatchdomsSecuritySDK.test();
        const ent = testsdk.PendingDelete();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CATCHDOMS_SECURITY_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'pending_delete.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "age", "req": false, "short": "Years since first Wayback snapshot", "type": "`$INTEGER`", "index$": 0 }, { "active": true, "name": "backlinks_count", "req": false, "short": "Total number of backlinks", "type": "`$INTEGER`", "index$": 1 }, { "active": true, "name": "days_until_drop", "req": false, "short": "Days until predicted drop date", "type": "`$INTEGER`", "index$": 2 }, { "active": true, "name": "id", "req": true, "short": "Unique domain identifier", "type": "`$INTEGER`", "index$": 3 }, { "active": true, "name": "name", "req": true, "short": "Domain name", "type": "`$STRING`", "index$": 4 }, { "active": true, "format": "date", "name": "predicted_drop_date", "req": true, "short": "Predicted drop date (YYYY-MM-DD)", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "referring_domains", "req": false, "short": "Number of unique referring domains", "type": "`$INTEGER`", "index$": 6 }, { "active": true, "name": "score", "req": false, "short": "CatchDoms quality score (0-100)", "type": "`$INTEGER`", "index$": 7 }, { "active": true, "name": "status", "req": true, "short": "Current domain status", "type": "`$STRING`", "index$": 8 }, { "active": true, "name": "tld", "req": true, "short": "Top-level domain extension", "type": "`$STRING`", "index$": 9 }], "id": { "field": "id", "name": "id" }, "name": "pending_delete", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "drop_date_max", "orig": "drop_date_max", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "drop_date_min", "orig": "drop_date_min", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "example": 1, "kind": "query", "name": "page", "orig": "page", "reqd": false, "type": "`$INTEGER`", "index$": 2 }, { "active": true, "example": 10, "kind": "query", "name": "per_page", "orig": "per_page", "reqd": false, "type": "`$INTEGER`", "index$": 3 }, { "active": true, "kind": "query", "name": "status", "orig": "status", "reqd": false, "type": "`$STRING`", "index$": 4 }, { "active": true, "kind": "query", "name": "tld", "orig": "tld", "reqd": false, "type": "`$STRING`", "index$": 5 }] }, "contract": { "id": "GET /api/pending-delete", "json": "{\"operationId\":\"getPendingDelete\",\"parameters\":[{\"description\":\"Domain status filter\",\"in\":\"query\",\"name\":\"status\",\"required\":false,\"schema\":{\"enum\":[\"pendingDelete\",\"redemptionPeriod\",\"serverHold\",\"clientHold\",\"transition\",\"quarantine\"],\"type\":\"string\"}},{\"description\":\"Top-level domain filter (e.g., .com, .net, .de, .fr, .uk, .nl, .it, .es, .ai, .ch)\",\"in\":\"query\",\"name\":\"tld\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Minimum predicted drop date (YYYY-MM-DD)\",\"in\":\"query\",\"name\":\"drop_date_min\",\"required\":false,\"schema\":{\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"Maximum predicted drop date (YYYY-MM-DD)\",\"in\":\"query\",\"name\":\"drop_date_max\",\"required\":false,\"schema\":{\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"Number of domains per response page (1-100)\",\"in\":\"query\",\"name\":\"per_page\",\"required\":false,\"schema\":{\"default\":10,\"maximum\":100,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Page number for pagination\",\"in\":\"query\",\"name\":\"page\",\"required\":false,\"schema\":{\"default\":1,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"age\":{\"description\":\"Years since first Wayback snapshot\",\"nullable\":true,\"type\":\"integer\"},\"backlinks_count\":{\"description\":\"Total number of backlinks\",\"nullable\":true,\"type\":\"integer\"},\"days_until_drop\":{\"description\":\"Days until predicted drop date\",\"type\":\"integer\"},\"id\":{\"description\":\"Unique domain identifier\",\"type\":\"integer\"},\"name\":{\"description\":\"Domain name\",\"type\":\"string\"},\"predicted_drop_date\":{\"description\":\"Predicted drop date (YYYY-MM-DD)\",\"format\":\"date\",\"type\":\"string\"},\"referring_domains\":{\"description\":\"Number of unique referring domains\",\"nullable\":true,\"type\":\"integer\"},\"score\":{\"description\":\"CatchDoms quality score (0-100)\",\"nullable\":true,\"type\":\"integer\"},\"status\":{\"description\":\"Current domain status\",\"enum\":[\"pendingDelete\",\"redemptionPeriod\",\"serverHold\",\"clientHold\",\"transition\",\"quarantine\"],\"type\":\"string\"},\"tld\":{\"description\":\"Top-level domain extension\",\"type\":\"string\"}},\"required\":[\"id\",\"name\",\"tld\",\"status\",\"predicted_drop_date\"],\"type\":\"object\"},\"type\":\"array\"},\"links\":{\"properties\":{\"first\":{\"format\":\"uri\",\"type\":\"string\"},\"last\":{\"format\":\"uri\",\"type\":\"string\"},\"next\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"},\"prev\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"meta\":{\"properties\":{\"current_page\":{\"type\":\"integer\"},\"total\":{\"type\":\"integer\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response with pending-delete domain data\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error type\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"error\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unauthorized - Invalid or missing API key\"},\"403\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"Forbidden\",\"message\":\"Authority+ subscription required to access pending-delete inventory\"},\"schema\":{\"properties\":{\"error\":{\"description\":\"Error type\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"error\",\"message\"],\"type\":\"object\"}}},\"description\":\"Forbidden - Authority+ plan required\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error type\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"error\",\"message\"],\"type\":\"object\"}}},\"description\":\"Too Many Requests - Rate limit exceeded\"}},\"security\":[{\"BearerAuth\":[]}],\"securitySchemes\":{\"BearerAuth\":{\"bearerFormat\":\"API Key\",\"description\":\"Bearer token authentication. Add 'Authorization: Bearer YOUR_API_KEY' header. Get your API key from the API dashboard at https://catchdoms.com/api\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/pending-delete", "segments": [{ "lit": "api" }, { "lit": "pending-delete" }], "select": { "exist": ["drop_date_max", "drop_date_min", "page", "per_page", "status", "tld"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "pending_delete", "name__orig": "pending_delete", "Name": "PendingDelete", "name_": "pending_delete", "name-": "pending-delete", "NAME": "PENDING_DELETE", "index$": 2 }, { "active": true, "entity": "pending_delete", "key$": "BasicPendingDeleteFlow", "kind": "basic", "name": "BasicPendingDeleteFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "pending_delete_ref01" } }], "index$": 0 }] }, 'PendingDelete');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let pending_delete_ref01_data = Object.values(setup.data.existing.pending_delete)[0];
        // LIST
        const pending_delete_ref01_ent = client.PendingDelete();
        const pending_delete_ref01_match = {};
        const pending_delete_ref01_list = (await pending_delete_ref01_ent.list(pending_delete_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/pending_delete/PendingDeleteTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CatchdomsSecuritySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['pending_delete01', 'pending_delete02', 'pending_delete03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CATCHDOMS_SECURITY_TEST_PENDING_DELETE_ENTID': idmap,
        'CATCHDOMS_SECURITY_TEST_LIVE': 'FALSE',
        'CATCHDOMS_SECURITY_TEST_EXPLAIN': 'FALSE',
        'CATCHDOMS_SECURITY_APIKEY': '',
    });
    idmap = env['CATCHDOMS_SECURITY_TEST_PENDING_DELETE_ENTID'];
    const live = 'TRUE' === env.CATCHDOMS_SECURITY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CATCHDOMS_SECURITY_TEST_PENDING_DELETE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.CatchdomsSecuritySDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.CATCHDOMS_SECURITY_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.CATCHDOMS_SECURITY_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=PendingDeleteEntity.test.js.map