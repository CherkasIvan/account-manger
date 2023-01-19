import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TransactionRepositoryService } from './transaction-repository.service';

import { Transaction } from '../../model/transaction.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Transaction])],
    providers: [TransactionRepositoryService],
    exports: [TransactionRepositoryService],
})
export class TransactionRepositoryModule {}
