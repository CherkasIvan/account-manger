import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Between, LessThan, Repository } from 'typeorm';

import { Transaction } from '../../model/transaction.entity';

/**
 * Service class for 'transaction' service
 */
@Injectable()
export class TransactionRepositoryService {
    /**
     * Constructor
     */
    constructor(
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>,
    ) {}

    /**
     * Save transaction
     * @param client Transaction object
     */
    public async save(transaction: Transaction): Promise<Transaction> {
        try {
            return this.transactionRepository.save(transaction);
        } catch (e) {
            throw new InternalServerErrorException();
        }
    }

    /**
     * Find all transaction by day
     * @param accountId Account id string
     * @param beforeOneDayDate Previous day string
     * @param afterOneDayDate Next day string
     */
    public async findAllByDay(
        accountId: string,
        beforeOneDayDate: string,
        afterOneDayDate: string,
    ): Promise<Transaction[]> {
        try {
            return this.transactionRepository.find({
                where: {
                    accountId,
                    value: LessThan(0),
                    transactionDate: Between(beforeOneDayDate, afterOneDayDate),
                },
            });
        } catch (e) {
            throw new InternalServerErrorException();
        }
    }

    /**
     * Find all transaction by id
     * @param accountId Account id string
     */
    public async findAllById(accountId: string): Promise<Transaction[]> {
        try {
            return this.transactionRepository.find({
                where: {
                    accountId,
                },
            });
        } catch (e) {
            throw new InternalServerErrorException();
        }
    }
}
