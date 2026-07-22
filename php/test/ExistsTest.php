<?php
declare(strict_types=1);

// CatchdomsSecurity SDK exists test

require_once __DIR__ . '/../catchdomssecurity_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = CatchdomsSecuritySDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
