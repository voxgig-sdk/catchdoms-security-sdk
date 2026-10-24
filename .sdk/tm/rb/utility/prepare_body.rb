# CatchdomsSecurity SDK utility: prepare_body
require_relative 'media'
module CatchdomsSecurityUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return CatchdomsSecurityUtilities.raw_body(ctx.reqdata) if CatchdomsSecurityUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
