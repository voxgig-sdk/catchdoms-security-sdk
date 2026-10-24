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
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('pending_delete hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.CatchdomsSecuritySDK.test(offline).PendingDelete().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.CatchdomsSecuritySDK.test(offline).PendingDelete()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.CatchdomsSecuritySDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.PendingDelete().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.CatchdomsSecuritySDK.test().PendingDelete().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.CatchdomsSecuritySDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.PendingDelete().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.PendingDelete().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.CatchdomsSecuritySDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.PendingDelete().list({ "drop_date_max": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CATCHDOMS_SECURITY_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'pending_delete.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "age": { "a": true, "h": "Age", "n": "age", "r": false, "sh": "Years since first Wayback snapshot", "t": "`$INTEGER`", "key$": "age", "index$": 0 }, "backlinks_count": { "a": true, "h": "Backlinks Count", "n": "backlinks_count", "r": false, "sh": "Total number of backlinks", "t": "`$INTEGER`", "key$": "backlinks_count", "index$": 1 }, "days_until_drop": { "a": true, "h": "Days Until Drop", "n": "days_until_drop", "r": false, "sh": "Days until predicted drop date", "t": "`$INTEGER`", "key$": "days_until_drop", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "Unique domain identifier", "t": "`$INTEGER`", "key$": "id", "index$": 3 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "sh": "Domain name", "t": "`$STRING`", "key$": "name", "index$": 4 }, "predicted_drop_date": { "a": true, "fo": "date", "h": "Predicted Drop Date", "n": "predicted_drop_date", "r": true, "sh": "Predicted drop date (YYYY-MM-DD)", "t": "`$STRING`", "key$": "predicted_drop_date", "index$": 5 }, "referring_domains": { "a": true, "h": "Referring Domains", "n": "referring_domains", "r": false, "sh": "Number of unique referring domains", "t": "`$INTEGER`", "key$": "referring_domains", "index$": 6 }, "score": { "a": true, "h": "Score", "n": "score", "r": false, "sh": "CatchDoms quality score (0-100)", "t": "`$INTEGER`", "key$": "score", "index$": 7 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "sh": "Current domain status", "t": "`$STRING`", "key$": "status", "index$": 8 }, "tld": { "a": true, "h": "Tld", "n": "tld", "r": true, "sh": "Top-level domain extension", "t": "`$STRING`", "key$": "tld", "index$": 9 } }, "id": { "field": "id", "name": "id" }, "name": "pending_delete", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/pending-delete", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "drop_date_max", "or": "drop_date_max", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "drop_date_min", "or": "drop_date_min", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "ex": 10, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 3 }, { "a": true, "k": "query", "n": "status", "or": "status", "r": false, "t": "`$STRING`", "index$": 4 }, { "a": true, "k": "query", "n": "tld", "or": "tld", "r": false, "t": "`$STRING`", "index$": 5 }] }, "k": "http", "m": "GET", "o": "/api/pending-delete", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "pending-delete" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "pending_delete", "name__orig": "pending_delete", "Name": "PendingDelete", "name_": "pending_delete", "name-": "pending-delete", "NAME": "PENDING_DELETE", "index$": 2 }, { "active": true, "entity": "pending_delete", "key$": "BasicPendingDeleteFlow", "kind": "basic", "name": "BasicPendingDeleteFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "pending_delete_ref01" } }], "index$": 0 }] }, 'PendingDelete', { "GET /api/pending-delete": { "protocol": "http", "parameters": [{ "name": "status", "in": "query", "description": "Domain status filter", "required": false, "schema": { "type": "string", "enum": ["pendingDelete", "redemptionPeriod", "serverHold", "clientHold", "transition", "quarantine"] }, "index$": 0 }, { "name": "tld", "in": "query", "description": "Top-level domain filter (e.g., .com, .net, .de, .fr, .uk, .nl, .it, .es, .ai, .ch)", "required": false, "schema": { "type": "string" }, "index$": 1 }, { "name": "drop_date_min", "in": "query", "description": "Minimum predicted drop date (YYYY-MM-DD)", "required": false, "schema": { "type": "string", "format": "date" }, "index$": 2 }, { "name": "drop_date_max", "in": "query", "description": "Maximum predicted drop date (YYYY-MM-DD)", "required": false, "schema": { "type": "string", "format": "date" }, "index$": 3 }, { "name": "per_page", "in": "query", "description": "Number of domains per response page (1-100)", "required": false, "schema": { "type": "integer", "minimum": 1, "maximum": 100, "default": 10 }, "index$": 4 }, { "name": "page", "in": "query", "description": "Page number for pagination", "required": false, "schema": { "type": "integer", "minimum": 1, "default": 1 }, "index$": 5 }] } }, { strict: LIVE_STRICT, t });
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
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
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