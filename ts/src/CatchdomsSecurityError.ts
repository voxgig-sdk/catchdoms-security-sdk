
import { Context } from './Context'


class CatchdomsSecurityError extends Error {

  isCatchdomsSecurityError = true

  sdk = 'CatchdomsSecurity'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  CatchdomsSecurityError
}

