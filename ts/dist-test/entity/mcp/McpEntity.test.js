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
(0, node_test_1.describe)('McpEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CATCHDOMS_SECURITY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CATCHDOMS_SECURITY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CatchdomsSecuritySDK.test();
        const ent = testsdk.Mcp();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CATCHDOMS_SECURITY_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'mcp.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": {}, "name": "mcp", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /mcp/catchdoms", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/mcp/catchdoms", "q": { "$action": "catchdom" }, "r": {}, "s": [{ "lit": "mcp" }, { "lit": "catchdoms" }], "t": { "req": "`reqdata`", "res": "`body.capabilities`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "mcp", "name__orig": "mcp", "Name": "Mcp", "name_": "mcp", "name-": "mcp", "NAME": "MCP", "index$": 1 }, { "active": true, "entity": "mcp", "key$": "BasicMcpFlow", "kind": "basic", "name": "BasicMcpFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "mcp_ref01" } }], "index$": 0 }] }, 'Mcp', { "GET /mcp/catchdoms": { "protocol": "http", "operationId": "getMCPServer", "responses": { "200": { "description": "MCP server endpoint active", "content": { "application/json": { "schema": { "type": "object", "properties": { "server": { "key$": "server", "type": "string" }, "version": { "key$": "version", "type": "string" }, "capabilities": { "items": { "type": "string" }, "key$": "capabilities", "type": "array" } } } } } } }, "parameters": [], "security": [{ "BearerAuth": [] }], "securitySource": "operation", "securitySchemes": { "BearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "API Key", "description": "Bearer token authentication. Add 'Authorization: Bearer YOUR_API_KEY' header. Get your API key from the API dashboard at https://catchdoms.com/api" } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let mcp_ref01_data = Object.values(setup.data.existing.mcp)[0];
        // LIST
        const mcp_ref01_ent = client.Mcp();
        const mcp_ref01_match = {};
        const mcp_ref01_list = (await mcp_ref01_ent.list(mcp_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/mcp/McpTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CatchdomsSecuritySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['mcp01', 'mcp02', 'mcp03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CATCHDOMS_SECURITY_TEST_MCP_ENTID': idmap,
        'CATCHDOMS_SECURITY_TEST_LIVE': 'FALSE',
        'CATCHDOMS_SECURITY_TEST_EXPLAIN': 'FALSE',
        'CATCHDOMS_SECURITY_APIKEY': '',
    });
    idmap = env['CATCHDOMS_SECURITY_TEST_MCP_ENTID'];
    const live = 'TRUE' === env.CATCHDOMS_SECURITY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CATCHDOMS_SECURITY_TEST_MCP_ENTID'];
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
//# sourceMappingURL=McpEntity.test.js.map