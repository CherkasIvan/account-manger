import {
    ConflictException,
    NotFoundException,
    Injectable,
    ForbiddenException,
} from '@nestjs/common';

import { AccountCreateDto } from '../../controller/accounts/dto/request/account.create.dto';
import { BalanceRefillUpdateDto } from '../../controller/accounts/dto/request/balance-refill.update.dto';
import { GetBalanceDto } from '../../controller/accounts/dto/response/get-balance.dto';

import { AccountRepositoryService } from '../../repository/accounts/account-repository.service';
import { TransactionRepositoryService } from '../../repository/transactions/transaction-repository.service';

import { Account } from '../../model/account.entity';

import { ChangeBalanceTypeEnum } from '../../utils/enums/change-balance-type.enum';
import { DAY_IN_SEC } from '../../utils/constans/constans';
import formatDate from '../../utils/functions/get-date';

/**
 * Service class for 'account' controller
 */
@Injectable()
export class AccountService {
    constructor(
        protected readonly accountRepository: AccountRepositoryService,
        protected readonly transactionRepository: TransactionRepositoryService,
    ) {}

    /**
     * Create account
     * @param accountCreateDto AccountCreateDto object
     */
    public async createAccount(
        accountCreateDto: AccountCreateDto,
    ): Promise<Account> {
        const savedUser = await this.accountRepository.save(accountCreateDto);
        return savedUser;
    }

    /**
     * Change balance
     * @param id Account id string
     * @param type ChangeBalanceTypeEnum enum
     * @param balanceRefillUpdateDto BalanceRefillUpdateDto object
     * @param cookieUsername cookieUsername string
     */
    public async changeBalance(
        id: string,
        type: ChangeBalanceTypeEnum,
        balanceRefillUpdateDto: BalanceRefillUpdateDto,
        cookieUsername: string,
    ): Promise<Account> {
        const client = await this.accountRepository.findClientNameByClientId(
            id,
            cookieUsername,
        );
        if (client?.name !== cookieUsername || !cookieUsername) {
            throw new ForbiddenException('You cannot see info this account');
        }

        const account = await this.accountRepository.findOne(id);

        if (!account) {
            throw new NotFoundException(`Account with id:${id} not found`);
        }

        if (!account.active) {
            throw new ConflictException(`Account with id:${id} doesn't active`);
        }

        const today = Date.now();
        const beforeDay = formatDate(new Date(today - DAY_IN_SEC * 100));
        const nextDay = formatDate(new Date(today + DAY_IN_SEC * 100));

        const todayTransactions = await this.transactionRepository.findAllByDay(
            id,
            beforeDay,
            nextDay,
        );

        const allDecreaseOnDay = todayTransactions.reduce(function (
            sum,
            currentTransaction,
        ) {
            return sum + -currentTransaction.value;
        },
        0);

        let value;
        switch (type) {
            case ChangeBalanceTypeEnum.INCREASE:
                account.balance += balanceRefillUpdateDto.value;
                value = balanceRefillUpdateDto.value;
                break;
            case ChangeBalanceTypeEnum.DECREASE:
                if (account.balance - balanceRefillUpdateDto.value < 0) {
                    throw new ConflictException(
                        `Balance cannot be less than 0`,
                    );
                }
                if (
                    account.dailyWithdrawalLimit <
                    allDecreaseOnDay + balanceRefillUpdateDto.value
                ) {
                    const allowMoney =
                        allDecreaseOnDay +
                        balanceRefillUpdateDto.value -
                        account.dailyWithdrawalLimit;
                    throw new ConflictException(
                        `You cannot get ${
                            allDecreaseOnDay + balanceRefillUpdateDto.value
                        } on a day. The limit will be exceeded by ${allowMoney}`,
                    );
                }
                account.balance -= balanceRefillUpdateDto.value;
                value = -balanceRefillUpdateDto.value;
                break;
            default:
                break;
        }

        const updatedAccount = await this.accountRepository.save(account);

        const transaction = {
            accountId: account.id,
            value,
            transactionDate: new Date().toISOString(),
            account: updatedAccount,
        };
        await this.transactionRepository.save(transaction);

        return Object.assign(account, updatedAccount);
    }

    /**
     * Get balance
     * @param id Account id string
     * @param cookieUsername cookieUsername string
     */
    public async getBalance(
        id: string,
        cookieUsername: string,
    ): Promise<GetBalanceDto> {
        const client = await this.accountRepository.findClientNameByClientId(
            id,
            cookieUsername,
        );
        if (client?.name !== cookieUsername || !cookieUsername) {
            throw new ForbiddenException('You cannot see info this account');
        }

        const account = await this.accountRepository.findOne(id);

        if (!account) {
            throw new NotFoundException(`Account with id:${id} not found`);
        }

        return {
            balance: account.balance,
        };
    }

    /**
     * Change balance
     * @param id Account id string
     * @param Active Status boolean
     * @param cookieUsername cookieUsername string
     */
    public async changeStatus(
        id: string,
        active: boolean,
        cookieUsername: string,
    ): Promise<Account> {
        const client = await this.accountRepository.findClientNameByClientId(
            id,
            cookieUsername,
        );
        if (client?.name !== cookieUsername || !cookieUsername) {
            throw new ForbiddenException('You cannot see info this account');
        }

        const account = await this.accountRepository.findOne(id);

        if (!account) {
            throw new NotFoundException(`Account with id:${id} not found`);
        }

        account.active = active;
        const updatedAccount = await this.accountRepository.save(account);

        return Object.assign(account, updatedAccount);
    }
}
