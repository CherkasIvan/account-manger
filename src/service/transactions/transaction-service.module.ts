import { Module } from '@nestjs/common';

import { TransactionService } from './transaction.service';

import { TransactionRepositoryModule } from '../../repository/transactions/transaction-repository.module';
import { AccountRepositoryModule } from '../../repository/accounts/account-repository.module';
import { ClientRepositoryModule } from '../../repository/clients/client-repository.module';

@Module({
    imports: [
        TransactionRepositoryModule,
        AccountRepositoryModule,
        ClientRepositoryModule,
    ],
    providers: [TransactionService],
    exports: [TransactionService],
})
export class TransactionServiceModule {}
