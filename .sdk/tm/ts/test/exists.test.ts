
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { CatchdomsSecuritySDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = CatchdomsSecuritySDK.test()
    equal(testsdk instanceof CatchdomsSecuritySDK, true,
      'CatchdomsSecuritySDK.test() must return a client synchronously')
  })

})
