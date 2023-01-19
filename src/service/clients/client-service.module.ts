import { Module } from '@nestjs/common';

import { ClientService } from './client.service';

import { ClientRepositoryModule } from '../../repository/clients/client-repository.module';
import { AccountRepositoryModule } from '../../repository/accounts/account-repository.module';

@Module({
    imports: [ClientRepositoryModule, AccountRepositoryModule],
    providers: [ClientService],
    exports: [ClientService],
})
export class ClientServiceModule {}
