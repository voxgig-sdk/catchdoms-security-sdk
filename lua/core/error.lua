-- CatchdomsSecurity SDK error

local CatchdomsSecurityError = {}
CatchdomsSecurityError.__index = CatchdomsSecurityError


function CatchdomsSecurityError.new(code, msg, ctx)
  local self = setmetatable({}, CatchdomsSecurityError)
  self.is_sdk_error = true
  self.sdk = "CatchdomsSecurity"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function CatchdomsSecurityError:error()
  return self.msg
end


function CatchdomsSecurityError:__tostring()
  return self.msg
end


return CatchdomsSecurityError
