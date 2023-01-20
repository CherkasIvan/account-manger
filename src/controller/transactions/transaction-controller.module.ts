import { Module } from '@nestjs/common';

import { TransactionServiceModule } from '../../service/transactions/transaction-service.module';

import { TransactionController } from './transaction.controller';

@Module({
    imports: [TransactionServiceModule],
    controllers: [TransactionController],
})
export class TransactionControllerModule {}
