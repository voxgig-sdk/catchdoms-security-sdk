<?php
declare(strict_types=1);

// CatchdomsSecurity SDK utility: prepare_body

class CatchdomsSecurityPrepareBody
{
    public static function call(CatchdomsSecurityContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
