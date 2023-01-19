import { Module } from '@nestjs/common';

import { AccountService } from './account.service';

import { AccountRepositoryModule } from '../../repository/accounts/account-repository.module';
import { TransactionRepositoryModule } from '../../repository/transactions/transaction-repository.module';

@Module({
    imports: [AccountRepositoryModule, TransactionRepositoryModule],
    providers: [AccountService],
    exports: [AccountService],
})
export class AccountServiceModule {}
