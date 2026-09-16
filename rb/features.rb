# CatchdomsSecurity SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module CatchdomsSecurityFeatures
  def self.make_feature(name)
    case name
    when "base"
      CatchdomsSecurityBaseFeature.new
    when "ratelimit"
      CatchdomsSecurityRatelimitFeature.new
    when "retry"
      CatchdomsSecurityRetryFeature.new
    when "test"
      CatchdomsSecurityTestFeature.new
    when "timeout"
      CatchdomsSecurityTimeoutFeature.new
    else
      CatchdomsSecurityBaseFeature.new
    end
  end
end
