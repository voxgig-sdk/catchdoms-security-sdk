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
(0, node_test_1.describe)('DomainEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CATCHDOMS_SECURITY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CATCHDOMS_SECURITY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CatchdomsSecuritySDK.test();
        const ent = testsdk.Domain();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CATCHDOMS_SECURITY_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'domain.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "age", "req": false, "short": "Years since first Wayback snapshot", "type": "`$INTEGER`", "index$": 0 }, { "active": true, "format": "date-time", "name": "auction_end_date", "req": false, "short": "Auction end date and time (ISO 8601)", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "backlinks_count", "req": false, "short": "Total number of backlinks", "type": "`$INTEGER`", "index$": 2 }, { "active": true, "name": "bids_count", "req": false, "short": "Number of bids", "type": "`$INTEGER`", "index$": 3 }, { "active": true, "name": "citation_flow", "req": false, "short": "Majestic Citation Flow score (0-100)", "type": "`$INTEGER`", "index$": 4 }, { "active": true, "name": "domain_authority", "req": false, "short": "Moz Domain Authority score (0-100)", "type": "`$INTEGER`", "index$": 5 }, { "active": true, "name": "edu_gov_backlinks", "req": false, "short": "Number of EDU/GOV backlinks", "type": "`$INTEGER`", "index$": 6 }, { "active": true, "format": "float", "name": "effective_price", "req": false, "short": "Effective price (max_bid or price) in EUR", "type": "`$NUMBER`", "index$": 7 }, { "active": true, "name": "has_gmb", "req": false, "short": "Has active Google Business Profile", "type": "`$BOOLEAN`", "index$": 8 }, { "active": true, "name": "id", "req": true, "short": "Unique domain identifier", "type": "`$INTEGER`", "index$": 9 }, { "active": true, "name": "language", "req": false, "short": "Detected content language (e.g., EN, FR, DE)", "type": "`$STRING`", "index$": 10 }, { "active": true, "format": "float", "name": "max_bid", "req": false, "short": "Current highest bid in EUR", "type": "`$NUMBER`", "index$": 11 }, { "active": true, "name": "name", "req": true, "short": "Domain name", "type": "`$STRING`", "index$": 12 }, { "active": true, "name": "pagerank", "req": false, "short": "Historical PageRank value", "type": "`$INTEGER`", "index$": 13 }, { "active": true, "format": "float", "name": "price", "req": false, "short": "Starting price or buy-now price in EUR", "type": "`$NUMBER`", "index$": 14 }, { "active": true, "format": "uri", "name": "purchase_url", "req": false, "short": "Direct URL to purchase or bid on the domain", "type": "`$STRING`", "index$": 15 }, { "active": true, "name": "referring_domains", "req": false, "short": "Number of unique referring domains", "type": "`$INTEGER`", "index$": 16 }, { "active": true, "name": "score", "req": true, "short": "CatchDoms quality score (0-100)", "type": "`$INTEGER`", "index$": 17 }, { "active": true, "name": "source", "req": true, "short": "Platform source (e.g., godaddy, dropcatch, regfree)", "type": "`$STRING`", "index$": 18 }, { "active": true, "name": "tld", "req": true, "short": "Top-level domain extension", "type": "`$STRING`", "index$": 19 }, { "active": true, "name": "topical_trust_flow", "req": false, "short": "Majestic Topical Trust Flow category", "type": "`$STRING`", "index$": 20 }, { "active": true, "name": "trust_flow", "req": false, "short": "Majestic Trust Flow score (0-100)", "type": "`$INTEGER`", "index$": 21 }, { "active": true, "name": "type", "req": false, "short": "Domain listing type", "type": "`$STRING`", "index$": 22 }, { "active": true, "format": "date", "name": "wayback_first_date", "req": false, "short": "Date of first Wayback snapshot", "type": "`$STRING`", "index$": 23 }, { "active": true, "name": "wayback_snapshots", "req": false, "short": "Number of Wayback Machine snapshots", "type": "`$INTEGER`", "index$": 24 }], "id": { "field": "id", "name": "id" }, "name": "domain", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "age_min", "orig": "age_min", "reqd": false, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "example": "Business,Health", "kind": "query", "name": "category", "orig": "category", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "kind": "query", "name": "cf_min", "orig": "cf_min", "reqd": false, "type": "`$INTEGER`", "index$": 2 }, { "active": true, "kind": "query", "name": "contain", "orig": "contain", "reqd": false, "type": "`$STRING`", "index$": 3 }, { "active": true, "kind": "query", "name": "da_min", "orig": "da_min", "reqd": false, "type": "`$INTEGER`", "index$": 4 }, { "active": true, "kind": "query", "name": "has_backlink", "orig": "has_backlink", "reqd": false, "type": "`$INTEGER`", "index$": 5 }, { "active": true, "kind": "query", "name": "has_bid", "orig": "has_bid", "reqd": false, "type": "`$INTEGER`", "index$": 6 }, { "active": true, "kind": "query", "name": "has_edu_gov", "orig": "has_edu_gov", "reqd": false, "type": "`$INTEGER`", "index$": 7 }, { "active": true, "kind": "query", "name": "has_gmb", "orig": "has_gmb", "reqd": false, "type": "`$INTEGER`", "index$": 8 }, { "active": true, "example": "EN", "kind": "query", "name": "language", "orig": "language", "reqd": false, "type": "`$STRING`", "index$": 9 }, { "active": true, "example": 1, "kind": "query", "name": "page", "orig": "page", "reqd": false, "type": "`$INTEGER`", "index$": 10 }, { "active": true, "example": 10, "kind": "query", "name": "per_page", "orig": "per_page", "reqd": false, "type": "`$INTEGER`", "index$": 11 }, { "active": true, "kind": "query", "name": "price_max", "orig": "price_max", "reqd": false, "type": "`$NUMBER`", "index$": 12 }, { "active": true, "kind": "query", "name": "price_min", "orig": "price_min", "reqd": false, "type": "`$NUMBER`", "index$": 13 }, { "active": true, "kind": "query", "name": "rd_min", "orig": "rd_min", "reqd": false, "type": "`$INTEGER`", "index$": 14 }, { "active": true, "kind": "query", "name": "score_min", "orig": "score_min", "reqd": false, "type": "`$INTEGER`", "index$": 15 }, { "active": true, "kind": "query", "name": "snapshots_min", "orig": "snapshots_min", "reqd": false, "type": "`$INTEGER`", "index$": 16 }, { "active": true, "kind": "query", "name": "source", "orig": "source", "reqd": false, "type": "`$STRING`", "index$": 17 }, { "active": true, "kind": "query", "name": "tf_min", "orig": "tf_min", "reqd": false, "type": "`$INTEGER`", "index$": 18 }, { "active": true, "example": ".com", "kind": "query", "name": "tld", "orig": "tld", "reqd": false, "type": "`$STRING`", "index$": 19 }, { "active": true, "kind": "query", "name": "type", "orig": "type", "reqd": false, "type": "`$STRING`", "index$": 20 }] }, "contract": { "id": "GET /api/domains", "json": "{\"operationId\":\"getDomains\",\"parameters\":[{\"description\":\"Platform source: dynadot, godaddy, catched, dropcatch, gname, snapnames, ukdroplists, subreg, webexpire, parkio, bloomup, seodomains, nameshift, nicsell, gnews-domains, backorders-domains, regfree (deleted ccTLDs - requires Authority plan)\",\"in\":\"query\",\"name\":\"source\",\"required\":false,\"schema\":{\"enum\":[\"dynadot\",\"godaddy\",\"catched\",\"dropcatch\",\"gname\",\"snapnames\",\"ukdroplists\",\"subreg\",\"webexpire\",\"parkio\",\"bloomup\",\"seodomains\",\"nameshift\",\"nicsell\",\"gnews-domains\",\"backorders-domains\",\"regfree\",\"namepros\",\"namecheap\",\"namesilo\",\"domainlore\",\"rakko\"],\"type\":\"string\"}},{\"description\":\"Top-level domain filter: .com, .net, .org, .fr, .de, .co.uk, .it, .nl, .es, .ca, etc.\",\"in\":\"query\",\"name\":\"tld\",\"required\":false,\"schema\":{\"example\":\".com\",\"type\":\"string\"}},{\"description\":\"Minimum quality score (0-100). Try 50+ for good domains.\",\"in\":\"query\",\"name\":\"score_min\",\"required\":false,\"schema\":{\"maximum\":100,\"minimum\":0,\"type\":\"integer\"}},{\"description\":\"Minimum years since first Wayback snapshot\",\"in\":\"query\",\"name\":\"age_min\",\"required\":false,\"schema\":{\"minimum\":0,\"type\":\"integer\"}},{\"description\":\"Domain listing type\",\"in\":\"query\",\"name\":\"type\",\"required\":false,\"schema\":{\"enum\":[\"auction\",\"closeout\",\"backorder\"],\"type\":\"string\"}},{\"description\":\"Filter to only domains with active bids (1 = true)\",\"in\":\"query\",\"name\":\"has_bids\",\"required\":false,\"schema\":{\"enum\":[0,1],\"type\":\"integer\"}},{\"description\":\"Filter to only domains with referring domains (1 = true)\",\"in\":\"query\",\"name\":\"has_backlinks\",\"required\":false,\"schema\":{\"enum\":[0,1],\"type\":\"integer\"}},{\"description\":\"Filter to only domains with an active Google Business Profile (1 = true)\",\"in\":\"query\",\"name\":\"has_gmb\",\"required\":false,\"schema\":{\"enum\":[0,1],\"type\":\"integer\"}},{\"description\":\"Filter to only domains with EDU or GOV referring domains (1 = true)\",\"in\":\"query\",\"name\":\"has_edu_gov\",\"required\":false,\"schema\":{\"enum\":[0,1],\"type\":\"integer\"}},{\"description\":\"Minimum Majestic Trust Flow score (0-100)\",\"in\":\"query\",\"name\":\"tf_min\",\"required\":false,\"schema\":{\"maximum\":100,\"minimum\":0,\"type\":\"integer\"}},{\"description\":\"Minimum Majestic Citation Flow score (0-100)\",\"in\":\"query\",\"name\":\"cf_min\",\"required\":false,\"schema\":{\"maximum\":100,\"minimum\":0,\"type\":\"integer\"}},{\"description\":\"Minimum Moz Domain Authority score (0-100)\",\"in\":\"query\",\"name\":\"da_min\",\"required\":false,\"schema\":{\"maximum\":100,\"minimum\":0,\"type\":\"integer\"}},{\"description\":\"Minimum referring domains count\",\"in\":\"query\",\"name\":\"rd_min\",\"required\":false,\"schema\":{\"minimum\":0,\"type\":\"integer\"}},{\"description\":\"Majestic TTF categories (comma-separated): Business, Health, Computers, Shopping, Recreation, Society, Sports, News, Science, Arts, Reference, Regional, Games, Home, World, Adult\",\"in\":\"query\",\"name\":\"categories\",\"required\":false,\"schema\":{\"example\":\"Business,Health\",\"type\":\"string\"}},{\"description\":\"Substring filter on the domain name (e.g., 'shop', 'travel')\",\"in\":\"query\",\"name\":\"contains\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Language detected from Wayback content (e.g., EN, FR, DE, ES)\",\"in\":\"query\",\"name\":\"language\",\"required\":false,\"schema\":{\"example\":\"EN\",\"type\":\"string\"}},{\"description\":\"Minimum price or current bid in EUR\",\"in\":\"query\",\"name\":\"price_min\",\"required\":false,\"schema\":{\"format\":\"float\",\"minimum\":0,\"type\":\"number\"}},{\"description\":\"Maximum price or current bid in EUR\",\"in\":\"query\",\"name\":\"price_max\",\"required\":false,\"schema\":{\"format\":\"float\",\"minimum\":0,\"type\":\"number\"}},{\"description\":\"Minimum Wayback snapshot count\",\"in\":\"query\",\"name\":\"snapshots_min\",\"required\":false,\"schema\":{\"minimum\":0,\"type\":\"integer\"}},{\"description\":\"Number of domains per response page (1-100)\",\"in\":\"query\",\"name\":\"per_page\",\"required\":false,\"schema\":{\"default\":10,\"maximum\":100,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Page number for pagination\",\"in\":\"query\",\"name\":\"page\",\"required\":false,\"schema\":{\"default\":1,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"data\":[{\"age\":15,\"auction_end_date\":\"2026-01-25T18:00:00Z\",\"backlinks_count\":1420,\"bids_count\":8,\"domain_authority\":28,\"effective_price\":125,\"id\":12345,\"language\":\"EN\",\"max_bid\":125,\"name\":\"example.com\",\"pagerank\":4,\"price\":12,\"purchase_url\":\"https://auctions.godaddy.com/...\",\"referring_domains\":89,\"score\":72,\"source\":\"godaddy\",\"tld\":\".com\",\"type\":\"auction\",\"wayback_first_date\":\"2011-03-14\",\"wayback_snapshots\":156}],\"links\":{\"first\":\"https://catchdoms.com/api/domains?page=1\",\"last\":\"https://catchdoms.com/api/domains?page=342\",\"next\":\"https://catchdoms.com/api/domains?page=2\",\"prev\":null},\"meta\":{\"current_page\":1,\"total\":3420}},\"schema\":{\"properties\":{\"data\":{\"items\":{\"properties\":{\"age\":{\"description\":\"Years since first Wayback snapshot\",\"nullable\":true,\"type\":\"integer\"},\"auction_end_date\":{\"description\":\"Auction end date and time (ISO 8601)\",\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"},\"backlinks_count\":{\"description\":\"Total number of backlinks\",\"nullable\":true,\"type\":\"integer\"},\"bids_count\":{\"description\":\"Number of bids\",\"nullable\":true,\"type\":\"integer\"},\"citation_flow\":{\"description\":\"Majestic Citation Flow score (0-100)\",\"nullable\":true,\"type\":\"integer\"},\"domain_authority\":{\"description\":\"Moz Domain Authority score (0-100)\",\"nullable\":true,\"type\":\"integer\"},\"edu_gov_backlinks\":{\"description\":\"Number of EDU/GOV backlinks\",\"nullable\":true,\"type\":\"integer\"},\"effective_price\":{\"description\":\"Effective price (max_bid or price) in EUR\",\"format\":\"float\",\"nullable\":true,\"type\":\"number\"},\"has_gmb\":{\"description\":\"Has active Google Business Profile\",\"nullable\":true,\"type\":\"boolean\"},\"id\":{\"description\":\"Unique domain identifier\",\"type\":\"integer\"},\"language\":{\"description\":\"Detected content language (e.g., EN, FR, DE)\",\"nullable\":true,\"type\":\"string\"},\"max_bid\":{\"description\":\"Current highest bid in EUR\",\"format\":\"float\",\"nullable\":true,\"type\":\"number\"},\"name\":{\"description\":\"Domain name\",\"type\":\"string\"},\"pagerank\":{\"description\":\"Historical PageRank value\",\"nullable\":true,\"type\":\"integer\"},\"price\":{\"description\":\"Starting price or buy-now price in EUR\",\"format\":\"float\",\"nullable\":true,\"type\":\"number\"},\"purchase_url\":{\"description\":\"Direct URL to purchase or bid on the domain\",\"format\":\"uri\",\"type\":\"string\"},\"referring_domains\":{\"description\":\"Number of unique referring domains\",\"nullable\":true,\"type\":\"integer\"},\"score\":{\"description\":\"CatchDoms quality score (0-100)\",\"type\":\"integer\"},\"source\":{\"description\":\"Platform source (e.g., godaddy, dropcatch, regfree)\",\"type\":\"string\"},\"tld\":{\"description\":\"Top-level domain extension\",\"type\":\"string\"},\"topical_trust_flow\":{\"description\":\"Majestic Topical Trust Flow category\",\"nullable\":true,\"type\":\"string\"},\"trust_flow\":{\"description\":\"Majestic Trust Flow score (0-100)\",\"nullable\":true,\"type\":\"integer\"},\"type\":{\"description\":\"Domain listing type\",\"enum\":[\"auction\",\"closeout\",\"backorder\",\"deleted\"],\"type\":\"string\"},\"wayback_first_date\":{\"description\":\"Date of first Wayback snapshot\",\"format\":\"date\",\"nullable\":true,\"type\":\"string\"},\"wayback_snapshots\":{\"description\":\"Number of Wayback Machine snapshots\",\"nullable\":true,\"type\":\"integer\"}},\"required\":[\"id\",\"name\",\"tld\",\"source\",\"score\"],\"type\":\"object\"},\"type\":\"array\"},\"links\":{\"properties\":{\"first\":{\"format\":\"uri\",\"type\":\"string\"},\"last\":{\"format\":\"uri\",\"type\":\"string\"},\"next\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"},\"prev\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"meta\":{\"properties\":{\"current_page\":{\"type\":\"integer\"},\"from\":{\"type\":\"integer\"},\"last_page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"to\":{\"type\":\"integer\"},\"total\":{\"type\":\"integer\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response with domain data\"},\"401\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"Unauthorized\",\"message\":\"Invalid API key\"},\"schema\":{\"properties\":{\"error\":{\"description\":\"Error type\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"error\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unauthorized - Invalid or missing API key\"},\"403\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"Forbidden\",\"message\":\"Authority plan required to access source=regfree\"},\"schema\":{\"properties\":{\"error\":{\"description\":\"Error type\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"error\",\"message\"],\"type\":\"object\"}}},\"description\":\"Forbidden - Authority plan required for this resource\"},\"429\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"Too Many Requests\",\"message\":\"Rate limit exceeded. Please wait 60 seconds and try again.\"},\"schema\":{\"properties\":{\"error\":{\"description\":\"Error type\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"error\",\"message\"],\"type\":\"object\"}}},\"description\":\"Too Many Requests - Rate limit exceeded\"}},\"security\":[{\"BearerAuth\":[]},{}],\"securitySchemes\":{\"BearerAuth\":{\"bearerFormat\":\"API Key\",\"description\":\"Bearer token authentication. Add 'Authorization: Bearer YOUR_API_KEY' header. Get your API key from the API dashboard at https://catchdoms.com/api\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/domains", "segments": [{ "lit": "api" }, { "lit": "domains" }], "select": { "exist": ["age_min", "category", "cf_min", "contain", "da_min", "has_backlink", "has_bid", "has_edu_gov", "has_gmb", "language", "page", "per_page", "price_max", "price_min", "rd_min", "score_min", "snapshots_min", "source", "tf_min", "tld", "type"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "domain", "name__orig": "domain", "Name": "Domain", "name_": "domain", "name-": "domain", "NAME": "DOMAIN", "index$": 0 }, { "active": true, "entity": "domain", "key$": "BasicDomainFlow", "kind": "basic", "name": "BasicDomainFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "domain_ref01" } }], "index$": 0 }] }, 'Domain');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let domain_ref01_data = Object.values(setup.data.existing.domain)[0];
        // LIST
        const domain_ref01_ent = client.Domain();
        const domain_ref01_match = {};
        const domain_ref01_list = (await domain_ref01_ent.list(domain_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/domain/DomainTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CatchdomsSecuritySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['domain01', 'domain02', 'domain03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CATCHDOMS_SECURITY_TEST_DOMAIN_ENTID': idmap,
        'CATCHDOMS_SECURITY_TEST_LIVE': 'FALSE',
        'CATCHDOMS_SECURITY_TEST_EXPLAIN': 'FALSE',
        'CATCHDOMS_SECURITY_APIKEY': '',
    });
    idmap = env['CATCHDOMS_SECURITY_TEST_DOMAIN_ENTID'];
    const live = 'TRUE' === env.CATCHDOMS_SECURITY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CATCHDOMS_SECURITY_TEST_DOMAIN_ENTID'];
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
//# sourceMappingURL=DomainEntity.test.js.map