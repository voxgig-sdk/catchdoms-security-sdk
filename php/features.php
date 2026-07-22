<?php
declare(strict_types=1);

// CatchdomsSecurity SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class CatchdomsSecurityFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new CatchdomsSecurityBaseFeature();
            case "test":
                return new CatchdomsSecurityTestFeature();
            default:
                return new CatchdomsSecurityBaseFeature();
        }
    }
}
