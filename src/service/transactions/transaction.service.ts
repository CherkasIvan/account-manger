import { ForbiddenException, Injectable } from '@nestjs/common';

import { TransactionRepositoryService } from '../../repository/transactions/transaction-repository.service';
import { AccountRepositoryService } from '../../repository/accounts/account-repository.service';
import { ClientRepositoryService } from '../../repository/clients/client-repository.service';

import { Transaction } from '../../model/transaction.entity';

/**
 * Service class for 'transaction' controller
 */
@Injectable()
export class TransactionService {
    constructor(
        protected readonly transactionRepository: TransactionRepositoryService,
        protected readonly accountRepository: AccountRepositoryService,
        protected readonly clientRepository: ClientRepositoryService,
    ) {}

    /**
     * Get transaction by account id
     * @param accountId Account id string
     * @param clientName Client id string
     */
    public async findAllById(
        accountId: string,
        cookieUsername: string,
    ): Promise<Transaction[]> {
        const client = await this.accountRepository.findClientNameByClientId(
            accountId,
            cookieUsername,
        );
        if (client?.name !== cookieUsername || !cookieUsername) {
            throw new ForbiddenException('You cannot see info this account');
        }

        return this.transactionRepository.findAllById(accountId);
    }
}
