

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


describe('PendingDeleteEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CATCHDOMS_SECURITY_TEST_LIVE=TRUE.
  afterEach(liveDelay('CATCHDOMS_SECURITY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CatchdomsSecuritySDK.test()
    const ent = testsdk.PendingDelete()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CATCHDOMS_SECURITY_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'pending_delete.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"age":{"a":true,"h":"Age","n":"age","r":false,"sh":"Years since first Wayback snapshot","t":"`$INTEGER`","key$":"age","index$":0},"backlinks_count":{"a":true,"h":"Backlinks Count","n":"backlinks_count","r":false,"sh":"Total number of backlinks","t":"`$INTEGER`","key$":"backlinks_count","index$":1},"days_until_drop":{"a":true,"h":"Days Until Drop","n":"days_until_drop","r":false,"sh":"Days until predicted drop date","t":"`$INTEGER`","key$":"days_until_drop","index$":2},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"Unique domain identifier","t":"`$INTEGER`","key$":"id","index$":3},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"Domain name","t":"`$STRING`","key$":"name","index$":4},"predicted_drop_date":{"a":true,"fo":"date","h":"Predicted Drop Date","n":"predicted_drop_date","r":true,"sh":"Predicted drop date (YYYY-MM-DD)","t":"`$STRING`","key$":"predicted_drop_date","index$":5},"referring_domains":{"a":true,"h":"Referring Domains","n":"referring_domains","r":false,"sh":"Number of unique referring domains","t":"`$INTEGER`","key$":"referring_domains","index$":6},"score":{"a":true,"h":"Score","n":"score","r":false,"sh":"CatchDoms quality score (0-100)","t":"`$INTEGER`","key$":"score","index$":7},"status":{"a":true,"h":"Status","n":"status","r":true,"sh":"Current domain status","t":"`$STRING`","key$":"status","index$":8},"tld":{"a":true,"h":"Tld","n":"tld","r":true,"sh":"Top-level domain extension","t":"`$STRING`","key$":"tld","index$":9}},"id":{"field":"id","name":"id"},"name":"pending_delete","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/pending-delete","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"drop_date_max","or":"drop_date_max","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"drop_date_min","or":"drop_date_min","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"ex":10,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"k":"query","n":"status","or":"status","r":false,"t":"`$STRING`","index$":4},{"a":true,"k":"query","n":"tld","or":"tld","r":false,"t":"`$STRING`","index$":5}]},"k":"http","m":"GET","o":"/api/pending-delete","q":{"exist":["drop_date_max","drop_date_min","page","per_page","status","tld"]},"r":{},"s":[{"lit":"api"},{"lit":"pending-delete"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"pending_delete","name__orig":"pending_delete","Name":"PendingDelete","name_":"pending_delete","name-":"pending-delete","NAME":"PENDING_DELETE","index$":2}, {"active":true,"entity":"pending_delete","key$":"BasicPendingDeleteFlow","kind":"basic","name":"BasicPendingDeleteFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"pending_delete_ref01"}}],"index$":0}]}, 'PendingDelete', {"GET /api/pending-delete":{"protocol":"http","operationId":"getPendingDelete","responses":{"200":{"description":"Successful response with pending-delete domain data","content":{"application/json":{"schema":{"type":"object","properties":{"data":{"items":{"properties":{"age":{"description":"Years since first Wayback snapshot","nullable":true,"type":"integer","key$":"age"},"backlinks_count":{"description":"Total number of backlinks","nullable":true,"type":"integer","key$":"backlinks_count"},"days_until_drop":{"description":"Days until predicted drop date","type":"integer","key$":"days_until_drop"},"id":{"description":"Unique domain identifier","type":"integer","key$":"id"},"name":{"description":"Domain name","type":"string","key$":"name"},"predicted_drop_date":{"description":"Predicted drop date (YYYY-MM-DD)","format":"date","type":"string","key$":"predicted_drop_date"},"referring_domains":{"description":"Number of unique referring domains","nullable":true,"type":"integer","key$":"referring_domains"},"score":{"description":"CatchDoms quality score (0-100)","nullable":true,"type":"integer","key$":"score"},"status":{"description":"Current domain status","enum":["pendingDelete","redemptionPeriod","serverHold","clientHold","transition","quarantine"],"type":"string","key$":"status"},"tld":{"description":"Top-level domain extension","type":"string","key$":"tld"}},"required":["id","name","tld","status","predicted_drop_date"],"type":"object","x-ref":"#/components/schemas/PendingDeleteDomain","index$":0},"key$":"data","type":"array"},"links":{"key$":"links","properties":{"first":{"format":"uri","type":"string"},"last":{"format":"uri","type":"string"},"next":{"format":"uri","nullable":true,"type":"string"},"prev":{"format":"uri","nullable":true,"type":"string"}},"type":"object"},"meta":{"key$":"meta","properties":{"current_page":{"type":"integer"},"total":{"type":"integer"}},"type":"object"}}}}}},"401":{"description":"Unauthorized - Invalid or missing API key","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error type"},"message":{"type":"string","description":"Error message"}},"required":["error","message"],"x-ref":"#/components/schemas/Error"}}}},"403":{"description":"Forbidden - Authority+ plan required","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error type"},"message":{"type":"string","description":"Error message"}},"required":["error","message"],"x-ref":"#/components/schemas/Error"},"example":{"error":"Forbidden","message":"Authority+ subscription required to access pending-delete inventory"}}}},"429":{"description":"Too Many Requests - Rate limit exceeded","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error type"},"message":{"type":"string","description":"Error message"}},"required":["error","message"],"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"status","in":"query","description":"Domain status filter","required":false,"schema":{"type":"string","enum":["pendingDelete","redemptionPeriod","serverHold","clientHold","transition","quarantine"]},"index$":0},{"name":"tld","in":"query","description":"Top-level domain filter (e.g., .com, .net, .de, .fr, .uk, .nl, .it, .es, .ai, .ch)","required":false,"schema":{"type":"string"},"index$":1},{"name":"drop_date_min","in":"query","description":"Minimum predicted drop date (YYYY-MM-DD)","required":false,"schema":{"type":"string","format":"date"},"index$":2},{"name":"drop_date_max","in":"query","description":"Maximum predicted drop date (YYYY-MM-DD)","required":false,"schema":{"type":"string","format":"date"},"index$":3},{"name":"per_page","in":"query","description":"Number of domains per response page (1-100)","required":false,"schema":{"type":"integer","minimum":1,"maximum":100,"default":10},"index$":4},{"name":"page","in":"query","description":"Page number for pagination","required":false,"schema":{"type":"integer","minimum":1,"default":1},"index$":5}],"security":[{"BearerAuth":[]}],"securitySource":"operation","securitySchemes":{"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"API Key","description":"Bearer token authentication. Add 'Authorization: Bearer YOUR_API_KEY' header. Get your API key from the API dashboard at https://catchdoms.com/api"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let pending_delete_ref01_data = Object.values(setup.data.existing.pending_delete)[0] as any

    // LIST
    const pending_delete_ref01_ent = client.PendingDelete()
    const pending_delete_ref01_match: any = {}

    const pending_delete_ref01_list = (await pending_delete_ref01_ent.list(pending_delete_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/pending_delete/PendingDeleteTestData.json')

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
    ['pending_delete01','pending_delete02','pending_delete03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CATCHDOMS_SECURITY_TEST_PENDING_DELETE_ENTID': idmap,
    'CATCHDOMS_SECURITY_TEST_LIVE': 'FALSE',
    'CATCHDOMS_SECURITY_TEST_EXPLAIN': 'FALSE',
    'CATCHDOMS_SECURITY_APIKEY': '',
  })

  idmap = env['CATCHDOMS_SECURITY_TEST_PENDING_DELETE_ENTID']

  const live = 'TRUE' === env.CATCHDOMS_SECURITY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CATCHDOMS_SECURITY_TEST_PENDING_DELETE_ENTID']
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
  
