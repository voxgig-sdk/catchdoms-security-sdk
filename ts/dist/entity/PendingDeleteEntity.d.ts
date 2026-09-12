import { CatchdomsSecurityEntityBase } from '../CatchdomsSecurityEntityBase';
import type { CatchdomsSecuritySDK } from '../CatchdomsSecuritySDK';
import type { Control } from '../types';
import type { PendingDelete, PendingDeleteListMatch } from '../CatchdomsSecurityTypes';
declare class PendingDeleteEntity extends CatchdomsSecurityEntityBase<PendingDelete> {
    constructor(client: CatchdomsSecuritySDK, entopts: any);
    make(this: PendingDeleteEntity): PendingDeleteEntity;
    list(this: any, reqmatch?: PendingDeleteListMatch, ctrl?: Control): Promise<PendingDeleteEntity[]>;
}
export { PendingDeleteEntity };
