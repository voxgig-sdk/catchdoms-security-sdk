# CatchdomsSecurity SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

CatchdomsSecurityUtility.registrar = ->(u) {
  u.clean = CatchdomsSecurityUtilities::Clean
  u.done = CatchdomsSecurityUtilities::Done
  u.make_error = CatchdomsSecurityUtilities::MakeError
  u.feature_add = CatchdomsSecurityUtilities::FeatureAdd
  u.feature_hook = CatchdomsSecurityUtilities::FeatureHook
  u.feature_init = CatchdomsSecurityUtilities::FeatureInit
  u.fetcher = CatchdomsSecurityUtilities::Fetcher
  u.make_fetch_def = CatchdomsSecurityUtilities::MakeFetchDef
  u.make_context = CatchdomsSecurityUtilities::MakeContext
  u.make_options = CatchdomsSecurityUtilities::MakeOptions
  u.make_request = CatchdomsSecurityUtilities::MakeRequest
  u.make_response = CatchdomsSecurityUtilities::MakeResponse
  u.make_result = CatchdomsSecurityUtilities::MakeResult
  u.make_point = CatchdomsSecurityUtilities::MakePoint
  u.make_spec = CatchdomsSecurityUtilities::MakeSpec
  u.make_url = CatchdomsSecurityUtilities::MakeUrl
  u.param = CatchdomsSecurityUtilities::Param
  u.prepare_auth = CatchdomsSecurityUtilities::PrepareAuth
  u.prepare_body = CatchdomsSecurityUtilities::PrepareBody
  u.prepare_headers = CatchdomsSecurityUtilities::PrepareHeaders
  u.prepare_method = CatchdomsSecurityUtilities::PrepareMethod
  u.prepare_params = CatchdomsSecurityUtilities::PrepareParams
  u.prepare_path = CatchdomsSecurityUtilities::PreparePath
  u.prepare_query = CatchdomsSecurityUtilities::PrepareQuery
  u.graphql_body = CatchdomsSecurityUtilities::GraphqlBody
  u.graphql_errors = CatchdomsSecurityUtilities::GraphqlErrors
  u.result_basic = CatchdomsSecurityUtilities::ResultBasic
  u.result_body = CatchdomsSecurityUtilities::ResultBody
  u.result_headers = CatchdomsSecurityUtilities::ResultHeaders
  u.transform_request = CatchdomsSecurityUtilities::TransformRequest
  u.transform_response = CatchdomsSecurityUtilities::TransformResponse
}
