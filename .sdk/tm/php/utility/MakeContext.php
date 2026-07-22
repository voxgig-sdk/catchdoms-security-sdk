<?php
declare(strict_types=1);

// CatchdomsSecurity SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class CatchdomsSecurityMakeContext
{
    public static function call(array $ctxmap, ?CatchdomsSecurityContext $basectx): CatchdomsSecurityContext
    {
        return new CatchdomsSecurityContext($ctxmap, $basectx);
    }
}
