# CatchdomsSecurity SDK utility: make_context
require_relative '../core/context'
module CatchdomsSecurityUtilities
  MakeContext = ->(ctxmap, basectx) {
    CatchdomsSecurityContext.new(ctxmap, basectx)
  }
end
