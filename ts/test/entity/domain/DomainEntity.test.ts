

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { CatchdomsSecuritySDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('DomainEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CATCHDOMS_SECURITY_TEST_LIVE=TRUE.
  afterEach(liveDelay('CATCHDOMS_SECURITY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CatchdomsSecuritySDK.test()
    const ent = testsdk.Domain()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CATCHDOMS_SECURITY_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'domain.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"age":{"a":true,"h":"Age","n":"age","r":false,"sh":"Years since first Wayback snapshot","t":"`$INTEGER`","key$":"age","index$":0},"auction_end_date":{"a":true,"fo":"date-time","h":"Auction End Date","n":"auction_end_date","r":false,"sh":"Auction end date and time (ISO 8601)","t":"`$STRING`","key$":"auction_end_date","index$":1},"backlinks_count":{"a":true,"h":"Backlinks Count","n":"backlinks_count","r":false,"sh":"Total number of backlinks","t":"`$INTEGER`","key$":"backlinks_count","index$":2},"bids_count":{"a":true,"h":"Bids Count","n":"bids_count","r":false,"sh":"Number of bids","t":"`$INTEGER`","key$":"bids_count","index$":3},"citation_flow":{"a":true,"h":"Citation Flow","n":"citation_flow","r":false,"sh":"Majestic Citation Flow score (0-100)","t":"`$INTEGER`","key$":"citation_flow","index$":4},"domain_authority":{"a":true,"h":"Domain Authority","n":"domain_authority","r":false,"sh":"Moz Domain Authority score (0-100)","t":"`$INTEGER`","key$":"domain_authority","index$":5},"edu_gov_backlinks":{"a":true,"h":"Edu Gov Backlinks","n":"edu_gov_backlinks","r":false,"sh":"Number of EDU/GOV backlinks","t":"`$INTEGER`","key$":"edu_gov_backlinks","index$":6},"effective_price":{"a":true,"fo":"float","h":"Effective Price","n":"effective_price","r":false,"sh":"Effective price (max_bid or price) in EUR","t":"`$NUMBER`","key$":"effective_price","index$":7},"has_gmb":{"a":true,"h":"Has Gmb","n":"has_gmb","r":false,"sh":"Has active Google Business Profile","t":"`$BOOLEAN`","key$":"has_gmb","index$":8},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"Unique domain identifier","t":"`$INTEGER`","key$":"id","index$":9},"language":{"a":true,"h":"Language","n":"language","r":false,"sh":"Detected content language (e.g., EN, FR, DE)","t":"`$STRING`","key$":"language","index$":10},"max_bid":{"a":true,"fo":"float","h":"Max Bid","n":"max_bid","r":false,"sh":"Current highest bid in EUR","t":"`$NUMBER`","key$":"max_bid","index$":11},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"Domain name","t":"`$STRING`","key$":"name","index$":12},"pagerank":{"a":true,"h":"Pagerank","n":"pagerank","r":false,"sh":"Historical PageRank value","t":"`$INTEGER`","key$":"pagerank","index$":13},"price":{"a":true,"fo":"float","h":"Price","n":"price","r":false,"sh":"Starting price or buy-now price in EUR","t":"`$NUMBER`","key$":"price","index$":14},"purchase_url":{"a":true,"fo":"uri","h":"Purchase Url","n":"purchase_url","r":false,"sh":"Direct URL to purchase or bid on the domain","t":"`$STRING`","key$":"purchase_url","index$":15},"referring_domains":{"a":true,"h":"Referring Domains","n":"referring_domains","r":false,"sh":"Number of unique referring domains","t":"`$INTEGER`","key$":"referring_domains","index$":16},"score":{"a":true,"h":"Score","n":"score","r":true,"sh":"CatchDoms quality score (0-100)","t":"`$INTEGER`","key$":"score","index$":17},"source":{"a":true,"h":"Source","n":"source","r":true,"sh":"Platform source (e.g., godaddy, dropcatch, regfree)","t":"`$STRING`","key$":"source","index$":18},"tld":{"a":true,"h":"Tld","n":"tld","r":true,"sh":"Top-level domain extension","t":"`$STRING`","key$":"tld","index$":19},"topical_trust_flow":{"a":true,"h":"Topical Trust Flow","n":"topical_trust_flow","r":false,"sh":"Majestic Topical Trust Flow category","t":"`$STRING`","key$":"topical_trust_flow","index$":20},"trust_flow":{"a":true,"h":"Trust Flow","n":"trust_flow","r":false,"sh":"Majestic Trust Flow score (0-100)","t":"`$INTEGER`","key$":"trust_flow","index$":21},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"Domain listing type","t":"`$STRING`","key$":"type","index$":22},"wayback_first_date":{"a":true,"fo":"date","h":"Wayback First Date","n":"wayback_first_date","r":false,"sh":"Date of first Wayback snapshot","t":"`$STRING`","key$":"wayback_first_date","index$":23},"wayback_snapshots":{"a":true,"h":"Wayback Snapshots","n":"wayback_snapshots","r":false,"sh":"Number of Wayback Machine snapshots","t":"`$INTEGER`","key$":"wayback_snapshots","index$":24}},"id":{"field":"id","name":"id"},"name":"domain","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/domains","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"age_min","or":"age_min","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":"Business,Health","k":"query","n":"category","or":"category","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"cf_min","or":"cf_min","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"k":"query","n":"contain","or":"contain","r":false,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"da_min","or":"da_min","r":false,"t":"`$INTEGER`","index$":4},{"a":true,"k":"query","n":"has_backlink","or":"has_backlink","r":false,"t":"`$INTEGER`","index$":5},{"a":true,"k":"query","n":"has_bid","or":"has_bid","r":false,"t":"`$INTEGER`","index$":6},{"a":true,"k":"query","n":"has_edu_gov","or":"has_edu_gov","r":false,"t":"`$INTEGER`","index$":7},{"a":true,"k":"query","n":"has_gmb","or":"has_gmb","r":false,"t":"`$INTEGER`","index$":8},{"a":true,"ex":"EN","k":"query","n":"language","or":"language","r":false,"t":"`$STRING`","index$":9},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":10},{"a":true,"ex":10,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":11},{"a":true,"k":"query","n":"price_max","or":"price_max","r":false,"t":"`$NUMBER`","index$":12},{"a":true,"k":"query","n":"price_min","or":"price_min","r":false,"t":"`$NUMBER`","index$":13},{"a":true,"k":"query","n":"rd_min","or":"rd_min","r":false,"t":"`$INTEGER`","index$":14},{"a":true,"k":"query","n":"score_min","or":"score_min","r":false,"t":"`$INTEGER`","index$":15},{"a":true,"k":"query","n":"snapshots_min","or":"snapshots_min","r":false,"t":"`$INTEGER`","index$":16},{"a":true,"k":"query","n":"source","or":"source","r":false,"t":"`$STRING`","index$":17},{"a":true,"k":"query","n":"tf_min","or":"tf_min","r":false,"t":"`$INTEGER`","index$":18},{"a":true,"ex":".com","k":"query","n":"tld","or":"tld","r":false,"t":"`$STRING`","index$":19},{"a":true,"k":"query","n":"type","or":"type","r":false,"t":"`$STRING`","index$":20}]},"k":"http","m":"GET","o":"/api/domains","q":{"exist":["age_min","category","cf_min","contain","da_min","has_backlink","has_bid","has_edu_gov","has_gmb","language","page","per_page","price_max","price_min","rd_min","score_min","snapshots_min","source","tf_min","tld","type"]},"r":{},"s":[{"lit":"api"},{"lit":"domains"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"domain","name__orig":"domain","Name":"Domain","name_":"domain","name-":"domain","NAME":"DOMAIN","index$":0}, {"active":true,"entity":"domain","key$":"BasicDomainFlow","kind":"basic","name":"BasicDomainFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"domain_ref01"}}],"index$":0}]}, 'Domain', {"GET /api/domains":{"protocol":"http","operationId":"getDomains","responses":{"200":{"description":"Successful response with domain data","content":{"application/json":{"schema":{"type":"object","properties":{"data":{"items":{"properties":{"age":{"description":"Years since first Wayback snapshot","nullable":true,"type":"integer","key$":"age"},"auction_end_date":{"description":"Auction end date and time (ISO 8601)","format":"date-time","nullable":true,"type":"string","key$":"auction_end_date"},"backlinks_count":{"description":"Total number of backlinks","nullable":true,"type":"integer","key$":"backlinks_count"},"bids_count":{"description":"Number of bids","nullable":true,"type":"integer","key$":"bids_count"},"citation_flow":{"description":"Majestic Citation Flow score (0-100)","nullable":true,"type":"integer","key$":"citation_flow"},"domain_authority":{"description":"Moz Domain Authority score (0-100)","nullable":true,"type":"integer","key$":"domain_authority"},"edu_gov_backlinks":{"description":"Number of EDU/GOV backlinks","nullable":true,"type":"integer","key$":"edu_gov_backlinks"},"effective_price":{"description":"Effective price (max_bid or price) in EUR","format":"float","nullable":true,"type":"number","key$":"effective_price"},"has_gmb":{"description":"Has active Google Business Profile","nullable":true,"type":"boolean","key$":"has_gmb"},"id":{"description":"Unique domain identifier","type":"integer","key$":"id"},"language":{"description":"Detected content language (e.g., EN, FR, DE)","nullable":true,"type":"string","key$":"language"},"max_bid":{"description":"Current highest bid in EUR","format":"float","nullable":true,"type":"number","key$":"max_bid"},"name":{"description":"Domain name","type":"string","key$":"name"},"pagerank":{"description":"Historical PageRank value","nullable":true,"type":"integer","key$":"pagerank"},"price":{"description":"Starting price or buy-now price in EUR","format":"float","nullable":true,"type":"number","key$":"price"},"purchase_url":{"description":"Direct URL to purchase or bid on the domain","format":"uri","type":"string","key$":"purchase_url"},"referring_domains":{"description":"Number of unique referring domains","nullable":true,"type":"integer","key$":"referring_domains"},"score":{"description":"CatchDoms quality score (0-100)","type":"integer","key$":"score"},"source":{"description":"Platform source (e.g., godaddy, dropcatch, regfree)","type":"string","key$":"source"},"tld":{"description":"Top-level domain extension","type":"string","key$":"tld"},"topical_trust_flow":{"description":"Majestic Topical Trust Flow category","nullable":true,"type":"string","key$":"topical_trust_flow"},"trust_flow":{"description":"Majestic Trust Flow score (0-100)","nullable":true,"type":"integer","key$":"trust_flow"},"type":{"description":"Domain listing type","enum":["auction","closeout","backorder","deleted"],"type":"string","key$":"type"},"wayback_first_date":{"description":"Date of first Wayback snapshot","format":"date","nullable":true,"type":"string","key$":"wayback_first_date"},"wayback_snapshots":{"description":"Number of Wayback Machine snapshots","nullable":true,"type":"integer","key$":"wayback_snapshots"}},"required":["id","name","tld","source","score"],"type":"object","x-ref":"#/components/schemas/Domain","index$":0},"key$":"data","type":"array"},"links":{"key$":"links","properties":{"first":{"format":"uri","type":"string"},"last":{"format":"uri","type":"string"},"next":{"format":"uri","nullable":true,"type":"string"},"prev":{"format":"uri","nullable":true,"type":"string"}},"type":"object"},"meta":{"key$":"meta","properties":{"current_page":{"type":"integer"},"from":{"type":"integer"},"last_page":{"type":"integer"},"per_page":{"type":"integer"},"to":{"type":"integer"},"total":{"type":"integer"}},"type":"object"}}},"example":{"data":[{"id":12345,"name":"example.com","tld":".com","source":"godaddy","type":"auction","price":12,"max_bid":125,"effective_price":125,"bids_count":8,"auction_end_date":"2026-01-25T18:00:00Z","score":72,"age":15,"pagerank":4,"domain_authority":28,"backlinks_count":1420,"referring_domains":89,"wayback_snapshots":156,"wayback_first_date":"2011-03-14","language":"EN","purchase_url":"https://auctions.godaddy.com/..."}],"links":{"first":"https://catchdoms.com/api/domains?page=1","last":"https://catchdoms.com/api/domains?page=342","prev":null,"next":"https://catchdoms.com/api/domains?page=2"},"meta":{"current_page":1,"total":3420}}}}},"401":{"description":"Unauthorized - Invalid or missing API key","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error type"},"message":{"type":"string","description":"Error message"}},"required":["error","message"],"x-ref":"#/components/schemas/Error"},"example":{"error":"Unauthorized","message":"Invalid API key"}}}},"403":{"description":"Forbidden - Authority plan required for this resource","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error type"},"message":{"type":"string","description":"Error message"}},"required":["error","message"],"x-ref":"#/components/schemas/Error"},"example":{"error":"Forbidden","message":"Authority plan required to access source=regfree"}}}},"429":{"description":"Too Many Requests - Rate limit exceeded","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error type"},"message":{"type":"string","description":"Error message"}},"required":["error","message"],"x-ref":"#/components/schemas/Error"},"example":{"error":"Too Many Requests","message":"Rate limit exceeded. Please wait 60 seconds and try again."}}}}},"parameters":[{"name":"source","in":"query","description":"Platform source: dynadot, godaddy, catched, dropcatch, gname, snapnames, ukdroplists, subreg, webexpire, parkio, bloomup, seodomains, nameshift, nicsell, gnews-domains, backorders-domains, regfree (deleted ccTLDs - requires Authority plan)","required":false,"schema":{"type":"string","enum":["dynadot","godaddy","catched","dropcatch","gname","snapnames","ukdroplists","subreg","webexpire","parkio","bloomup","seodomains","nameshift","nicsell","gnews-domains","backorders-domains","regfree","namepros","namecheap","namesilo","domainlore","rakko"]},"index$":0},{"name":"tld","in":"query","description":"Top-level domain filter: .com, .net, .org, .fr, .de, .co.uk, .it, .nl, .es, .ca, etc.","required":false,"schema":{"type":"string","example":".com"},"index$":1},{"name":"score_min","in":"query","description":"Minimum quality score (0-100). Try 50+ for good domains.","required":false,"schema":{"type":"integer","minimum":0,"maximum":100},"index$":2},{"name":"age_min","in":"query","description":"Minimum years since first Wayback snapshot","required":false,"schema":{"type":"integer","minimum":0},"index$":3},{"name":"type","in":"query","description":"Domain listing type","required":false,"schema":{"type":"string","enum":["auction","closeout","backorder"]},"index$":4},{"name":"has_bids","in":"query","description":"Filter to only domains with active bids (1 = true)","required":false,"schema":{"type":"integer","enum":[0,1]},"index$":5},{"name":"has_backlinks","in":"query","description":"Filter to only domains with referring domains (1 = true)","required":false,"schema":{"type":"integer","enum":[0,1]},"index$":6},{"name":"has_gmb","in":"query","description":"Filter to only domains with an active Google Business Profile (1 = true)","required":false,"schema":{"type":"integer","enum":[0,1]},"index$":7},{"name":"has_edu_gov","in":"query","description":"Filter to only domains with EDU or GOV referring domains (1 = true)","required":false,"schema":{"type":"integer","enum":[0,1]},"index$":8},{"name":"tf_min","in":"query","description":"Minimum Majestic Trust Flow score (0-100)","required":false,"schema":{"type":"integer","minimum":0,"maximum":100},"index$":9},{"name":"cf_min","in":"query","description":"Minimum Majestic Citation Flow score (0-100)","required":false,"schema":{"type":"integer","minimum":0,"maximum":100},"index$":10},{"name":"da_min","in":"query","description":"Minimum Moz Domain Authority score (0-100)","required":false,"schema":{"type":"integer","minimum":0,"maximum":100},"index$":11},{"name":"rd_min","in":"query","description":"Minimum referring domains count","required":false,"schema":{"type":"integer","minimum":0},"index$":12},{"name":"categories","in":"query","description":"Majestic TTF categories (comma-separated): Business, Health, Computers, Shopping, Recreation, Society, Sports, News, Science, Arts, Reference, Regional, Games, Home, World, Adult","required":false,"schema":{"type":"string","example":"Business,Health"},"index$":13},{"name":"contains","in":"query","description":"Substring filter on the domain name (e.g., 'shop', 'travel')","required":false,"schema":{"type":"string"},"index$":14},{"name":"language","in":"query","description":"Language detected from Wayback content (e.g., EN, FR, DE, ES)","required":false,"schema":{"type":"string","example":"EN"},"index$":15},{"name":"price_min","in":"query","description":"Minimum price or current bid in EUR","required":false,"schema":{"type":"number","format":"float","minimum":0},"index$":16},{"name":"price_max","in":"query","description":"Maximum price or current bid in EUR","required":false,"schema":{"type":"number","format":"float","minimum":0},"index$":17},{"name":"snapshots_min","in":"query","description":"Minimum Wayback snapshot count","required":false,"schema":{"type":"integer","minimum":0},"index$":18},{"name":"per_page","in":"query","description":"Number of domains per response page (1-100)","required":false,"schema":{"type":"integer","minimum":1,"maximum":100,"default":10},"index$":19},{"name":"page","in":"query","description":"Page number for pagination","required":false,"schema":{"type":"integer","minimum":1,"default":1},"index$":20}],"security":[{"BearerAuth":[]},{}],"securitySource":"operation","securitySchemes":{"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"API Key","description":"Bearer token authentication. Add 'Authorization: Bearer YOUR_API_KEY' header. Get your API key from the API dashboard at https://catchdoms.com/api"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let domain_ref01_data = Object.values(setup.data.existing.domain)[0] as any

    // LIST
    const domain_ref01_ent = client.Domain()
    const domain_ref01_match: any = {}

    const domain_ref01_list = (await domain_ref01_ent.list(domain_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/domain/DomainTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = CatchdomsSecuritySDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['domain01','domain02','domain03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CATCHDOMS_SECURITY_TEST_DOMAIN_ENTID': idmap,
    'CATCHDOMS_SECURITY_TEST_LIVE': 'FALSE',
    'CATCHDOMS_SECURITY_TEST_EXPLAIN': 'FALSE',
    'CATCHDOMS_SECURITY_APIKEY': '',
  })

  idmap = env['CATCHDOMS_SECURITY_TEST_DOMAIN_ENTID']

  const live = 'TRUE' === env.CATCHDOMS_SECURITY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CATCHDOMS_SECURITY_TEST_DOMAIN_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new CatchdomsSecuritySDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
