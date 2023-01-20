import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { AccountCreateDto } from '../../controller/accounts/dto/request/account.create.dto';

import { Client } from '../../model/client.entity';
import { Account } from '../../model/account.entity';

/**
 * Service class for 'account' service
 */
@Injectable()
export class AccountRepositoryService {
    /**
     * Constructor
     */
    constructor(
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>,
    ) {}

    /**
     * Save account
     * @param accountCreateDto AccountCreateDto | Account object
     */
    public async save(
        accountCreateDto: AccountCreateDto | Account,
    ): Promise<Account> {
        try {
            return this.accountRepository.save(accountCreateDto);
        } catch (e) {
            throw new InternalServerErrorException();
        }
    }

    /**
     * Find one account
     * @param id Account id string
     */
    public async findOne(id: string): Promise<Account | null> {
        try {
            return await this.accountRepository.findOneByOrFail({ id });
        } catch (e) {
            return null;
        }
    }

    /**
     * Find one account by client id
     * @param accountId Account id string
     * @param clientId Client id string
     */
    public async findClientNameByClientId(
        accountId: string,
        cookieUsername: string,
    ): Promise<Client | null> {
        try {
            return await this.accountRepository
                .createQueryBuilder('accounts')
                .leftJoinAndSelect('accounts.client', 'clients')
                .where('accounts.id = :accountId', { accountId })
                .andWhere('clients.name = :cookieUsername', { cookieUsername })
                .select(['clients.name AS name'])
                .getRawOne();
        } catch (e) {
            return null;
        }
    }

    /**
     * Find one account
     * @param clientId Client id string
     */
    public async deleteByClientId(clientId: string): Promise<void> {
        try {
            await this.accountRepository.delete({ personId: clientId });
        } catch (e) {
            return null;
        }
    }
}
