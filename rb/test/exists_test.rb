# CatchdomsSecurity SDK exists test

require "minitest/autorun"
require_relative "../CatchdomsSecurity_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = CatchdomsSecuritySDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
