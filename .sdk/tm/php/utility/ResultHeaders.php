<?php
declare(strict_types=1);

// CatchdomsSecurity SDK utility: result_headers

class CatchdomsSecurityResultHeaders
{
    public static function call(CatchdomsSecurityContext $ctx): ?CatchdomsSecurityResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
