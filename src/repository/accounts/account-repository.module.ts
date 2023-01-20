import { Module } from '@nestjs/common';

import { AccountRepositoryService } from './account-repository.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../../model/account.entity';
import { Transaction } from '../../model/transaction.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Account, Transaction])],
    providers: [AccountRepositoryService],
    exports: [AccountRepositoryService],
})
export class AccountRepositoryModule {}
