<?php
declare(strict_types=1);

// Mcp entity test

require_once __DIR__ . '/../catchdomssecurity_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class McpEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = CatchdomsSecuritySDK::test(null, null);
        $ent = $testsdk->Mcp(null);
        $this->assertNotNull($ent);
    }

    // Feature #4: the entity stream(action, ...) method runs the op pipeline
    // and yields result items. With the streaming feature active it yields the
    // feature's incremental output; otherwise it falls back to the materialised
    // list so stream always yields.
    public function test_stream(): void
    {
        $seed = [
            "entity" => [
                "mcp" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = CatchdomsSecuritySDK::test($seed, null);
        $seen = iterator_to_array($base->Mcp(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = CatchdomsSecurityConfig::shared_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = CatchdomsSecuritySDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->Mcp(null)->stream("list", null, null) as $item) {
                if (is_array($item) && array_is_list($item)) {
                    foreach ($item as $sub) {
                        $got[] = $sub;
                    }
                } else {
                    $got[] = $item;
                }
            }
            $this->assertCount(3, $got);
        }
    }

    public function test_basic_flow(): void
    {
        $setup = mcp_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "mcp." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set CATCHDOMS_SECURITY_TEST_MCP_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $mcp_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.mcp")));
        $mcp_ref01_data = null;
        if (count($mcp_ref01_data_raw) > 0) {
            $mcp_ref01_data = Helpers::to_map($mcp_ref01_data_raw[0][1]);
        }

        // LIST
        $mcp_ref01_ent = $client->Mcp(null);
        $mcp_ref01_match = [];

        $mcp_ref01_list_result = $mcp_ref01_ent->list($mcp_ref01_match, null);
        $this->assertIsArray($mcp_ref01_list_result);

    }
}

function mcp_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/mcp/McpTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = CatchdomsSecuritySDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["mcp01", "mcp02", "mcp03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("CATCHDOMS_SECURITY_TEST_MCP_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "CATCHDOMS_SECURITY_TEST_MCP_ENTID" => $idmap,
        "CATCHDOMS_SECURITY_TEST_LIVE" => "FALSE",
        "CATCHDOMS_SECURITY_TEST_EXPLAIN" => "FALSE",
        "CATCHDOMS_SECURITY_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["CATCHDOMS_SECURITY_TEST_MCP_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["CATCHDOMS_SECURITY_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["CATCHDOMS_SECURITY_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new CatchdomsSecuritySDK(Helpers::to_map($merged_opts));
    }

    $live = $env["CATCHDOMS_SECURITY_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["CATCHDOMS_SECURITY_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
