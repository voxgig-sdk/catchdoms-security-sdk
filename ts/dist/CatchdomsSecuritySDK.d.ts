import { DomainEntity } from './entity/DomainEntity';
import { McpEntity } from './entity/McpEntity';
import { PendingDeleteEntity } from './entity/PendingDeleteEntity';
export type * from './CatchdomsSecurityTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { CatchdomsSecurityEntityBase } from './CatchdomsSecurityEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class CatchdomsSecuritySDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Domain(entopts?: Record<string, any>): DomainEntity;
    Mcp(entopts?: Record<string, any>): McpEntity;
    PendingDelete(entopts?: Record<string, any>): PendingDeleteEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): CatchdomsSecuritySDK;
    tester(testopts?: any, sdkopts?: any): CatchdomsSecuritySDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof CatchdomsSecuritySDK;
export { stdutil, config, BaseFeature, CatchdomsSecurityEntityBase, CatchdomsSecuritySDK, SDK, };
