

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { CatchdomsSecuritySDK, BaseFeature, config, stdutil } from '../../..'

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


describe('McpEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CATCHDOMS_SECURITY_TEST_LIVE=TRUE.
  afterEach(liveDelay('CATCHDOMS_SECURITY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CatchdomsSecuritySDK.test()
    const ent = testsdk.Mcp()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('mcp hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of CatchdomsSecuritySDK.test(offline).Mcp().stream('list')) { }
    }, /offline/)

    for await (const _item of CatchdomsSecuritySDK.test(offline).Mcp()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = CatchdomsSecuritySDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Mcp().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of CatchdomsSecuritySDK.test().Mcp().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new CatchdomsSecuritySDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Mcp().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Mcp().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CATCHDOMS_SECURITY_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'mcp.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"mcp","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /mcp/catchdoms","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/mcp/catchdoms","q":{"$action":"catchdom"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"mcp"},{"lit":"catchdoms"}],"t":{"req":"`reqdata`","res":"`body.capabilities`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"mcp","name__orig":"mcp","Name":"Mcp","name_":"mcp","name-":"mcp","NAME":"MCP","index$":1}, {"active":true,"entity":"mcp","key$":"BasicMcpFlow","kind":"basic","name":"BasicMcpFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"mcp_ref01"}}],"index$":0}]}, 'Mcp', {"GET /mcp/catchdoms":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let mcp_ref01_data = Object.values(setup.data.existing.mcp)[0] as any

    // LIST
    const mcp_ref01_ent = client.Mcp()
    const mcp_ref01_match: any = {}

    const mcp_ref01_list = (await mcp_ref01_ent.list(mcp_ref01_match)).map((e: any) => e.data())


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/mcp/McpTestData.json')

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
    ['mcp01','mcp02','mcp03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CATCHDOMS_SECURITY_TEST_MCP_ENTID': idmap,
    'CATCHDOMS_SECURITY_TEST_LIVE': 'FALSE',
    'CATCHDOMS_SECURITY_TEST_EXPLAIN': 'FALSE',
    'CATCHDOMS_SECURITY_APIKEY': '',
  })

  idmap = env['CATCHDOMS_SECURITY_TEST_MCP_ENTID']

  const live = 'TRUE' === env.CATCHDOMS_SECURITY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CATCHDOMS_SECURITY_TEST_MCP_ENTID']
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
  
