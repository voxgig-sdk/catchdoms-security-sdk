
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { CatchdomsSecuritySDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await CatchdomsSecuritySDK.test()
    equal(null !== testsdk, true)
  })

})
