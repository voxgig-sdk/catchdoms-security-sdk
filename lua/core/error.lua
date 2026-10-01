-- CatchdomsSecurity SDK error

local json = require("dkjson")

local CatchdomsSecurityError = {}
CatchdomsSecurityError.__index = CatchdomsSecurityError

-- Reachable for a debugger, absent from the table itself: the context holds
-- the live spec and options, and an error is what gets dumped or encoded.
local CONTEXT = setmetatable({}, { __mode = "k" })


function CatchdomsSecurityError.new(code, msg, ctx)
  local self = setmetatable({}, CatchdomsSecurityError)
  self.is_sdk_error = true
  self.sdk = "CatchdomsSecurity"
  self.code = code or ""
  self.msg = msg or ""
  self.result = nil
  self.spec = nil
  CONTEXT[self] = ctx
  return self
end


function CatchdomsSecurityError:context()
  return CONTEXT[self]
end


function CatchdomsSecurityError:error()
  return self.msg
end


-- What make_error attached is already cleaned; the context is not part of
-- the record.
function CatchdomsSecurityError:to_table()
  return {
    sdk = self.sdk,
    code = self.code,
    msg = self.msg,
    status = self.status,
    result = self.result,
    spec = self.spec,
  }
end


function CatchdomsSecurityError:to_json()
  return json.encode(self:to_table())
end


function CatchdomsSecurityError:__tostring()
  return self.msg
end


function CatchdomsSecurityError.__tojson(self)
  return self:to_json()
end


return CatchdomsSecurityError
