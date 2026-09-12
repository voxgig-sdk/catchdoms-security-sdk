import { CatchdomsSecurityEntityBase } from '../CatchdomsSecurityEntityBase';
import type { CatchdomsSecuritySDK } from '../CatchdomsSecuritySDK';
import type { Control } from '../types';
import type { Mcp, McpListMatch } from '../CatchdomsSecurityTypes';
declare class McpEntity extends CatchdomsSecurityEntityBase<Mcp> {
    constructor(client: CatchdomsSecuritySDK, entopts: any);
    make(this: McpEntity): McpEntity;
    list(this: any, reqmatch?: McpListMatch, ctrl?: Control): Promise<McpEntity[]>;
}
export { McpEntity };
