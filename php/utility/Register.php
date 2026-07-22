<?php
declare(strict_types=1);

// CatchdomsSecurity SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

CatchdomsSecurityUtility::setRegistrar(function (CatchdomsSecurityUtility $u): void {
    $u->clean = [CatchdomsSecurityClean::class, 'call'];
    $u->done = [CatchdomsSecurityDone::class, 'call'];
    $u->make_error = [CatchdomsSecurityMakeError::class, 'call'];
    $u->feature_add = [CatchdomsSecurityFeatureAdd::class, 'call'];
    $u->feature_hook = [CatchdomsSecurityFeatureHook::class, 'call'];
    $u->feature_init = [CatchdomsSecurityFeatureInit::class, 'call'];
    $u->fetcher = [CatchdomsSecurityFetcher::class, 'call'];
    $u->make_fetch_def = [CatchdomsSecurityMakeFetchDef::class, 'call'];
    $u->make_context = [CatchdomsSecurityMakeContext::class, 'call'];
    $u->make_options = [CatchdomsSecurityMakeOptions::class, 'call'];
    $u->make_request = [CatchdomsSecurityMakeRequest::class, 'call'];
    $u->make_response = [CatchdomsSecurityMakeResponse::class, 'call'];
    $u->make_result = [CatchdomsSecurityMakeResult::class, 'call'];
    $u->make_point = [CatchdomsSecurityMakePoint::class, 'call'];
    $u->make_spec = [CatchdomsSecurityMakeSpec::class, 'call'];
    $u->make_url = [CatchdomsSecurityMakeUrl::class, 'call'];
    $u->param = [CatchdomsSecurityParam::class, 'call'];
    $u->prepare_auth = [CatchdomsSecurityPrepareAuth::class, 'call'];
    $u->prepare_body = [CatchdomsSecurityPrepareBody::class, 'call'];
    $u->prepare_headers = [CatchdomsSecurityPrepareHeaders::class, 'call'];
    $u->prepare_method = [CatchdomsSecurityPrepareMethod::class, 'call'];
    $u->prepare_params = [CatchdomsSecurityPrepareParams::class, 'call'];
    $u->prepare_path = [CatchdomsSecurityPreparePath::class, 'call'];
    $u->prepare_query = [CatchdomsSecurityPrepareQuery::class, 'call'];
    $u->result_basic = [CatchdomsSecurityResultBasic::class, 'call'];
    $u->result_body = [CatchdomsSecurityResultBody::class, 'call'];
    $u->result_headers = [CatchdomsSecurityResultHeaders::class, 'call'];
    $u->transform_request = [CatchdomsSecurityTransformRequest::class, 'call'];
    $u->transform_response = [CatchdomsSecurityTransformResponse::class, 'call'];
});
