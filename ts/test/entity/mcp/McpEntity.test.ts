

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CATCHDOMS_SECURITY_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'mcp.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"mcp","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /mcp/catchdoms","json":"{\"operationId\":\"getMCPServer\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"capabilities\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"server\":{\"type\":\"string\"},\"version\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"MCP server endpoint active\"}},\"security\":[{\"BearerAuth\":[]}],\"securitySchemes\":{\"BearerAuth\":{\"bearerFormat\":\"API Key\",\"description\":\"Bearer token authentication. Add 'Authorization: Bearer YOUR_API_KEY' header. Get your API key from the API dashboard at https://catchdoms.com/api\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/mcp/catchdoms","segments":[{"lit":"mcp"},{"lit":"catchdoms"}],"select":{"$action":"catchdom"},"transform":{"req":"`reqdata`","res":"`body.capabilities`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"mcp","name__orig":"mcp","Name":"Mcp","name_":"mcp","name-":"mcp","NAME":"MCP","index$":1}, {"active":true,"entity":"mcp","key$":"BasicMcpFlow","kind":"basic","name":"BasicMcpFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"mcp_ref01"}}],"index$":0}]}, 'Mcp')
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
  
