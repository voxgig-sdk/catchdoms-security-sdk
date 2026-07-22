<?php
declare(strict_types=1);

// CatchdomsSecurity SDK base feature

class CatchdomsSecurityBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(CatchdomsSecurityContext $ctx, array $options): void {}
    public function PostConstruct(CatchdomsSecurityContext $ctx): void {}
    public function PostConstructEntity(CatchdomsSecurityContext $ctx): void {}
    public function SetData(CatchdomsSecurityContext $ctx): void {}
    public function GetData(CatchdomsSecurityContext $ctx): void {}
    public function GetMatch(CatchdomsSecurityContext $ctx): void {}
    public function SetMatch(CatchdomsSecurityContext $ctx): void {}
    public function PrePoint(CatchdomsSecurityContext $ctx): void {}
    public function PreSpec(CatchdomsSecurityContext $ctx): void {}
    public function PreRequest(CatchdomsSecurityContext $ctx): void {}
    public function PreResponse(CatchdomsSecurityContext $ctx): void {}
    public function PreResult(CatchdomsSecurityContext $ctx): void {}
    public function PreDone(CatchdomsSecurityContext $ctx): void {}
    public function PreUnexpected(CatchdomsSecurityContext $ctx): void {}
}
