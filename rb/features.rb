# CatchdomsSecurity SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module CatchdomsSecurityFeatures
  def self.make_feature(name)
    case name
    when "base"
      CatchdomsSecurityBaseFeature.new
    when "test"
      CatchdomsSecurityTestFeature.new
    else
      CatchdomsSecurityBaseFeature.new
    end
  end
end
