import { CatchdomsSecurityEntityBase } from '../CatchdomsSecurityEntityBase';
import type { CatchdomsSecuritySDK } from '../CatchdomsSecuritySDK';
import type { Control } from '../types';
import type { Domain, DomainListMatch } from '../CatchdomsSecurityTypes';
declare class DomainEntity extends CatchdomsSecurityEntityBase<Domain> {
    constructor(client: CatchdomsSecuritySDK, entopts: any);
    make(this: DomainEntity): DomainEntity;
    list(this: any, reqmatch?: DomainListMatch, ctrl?: Control): Promise<DomainEntity[]>;
}
export { DomainEntity };
