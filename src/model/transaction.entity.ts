import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Account } from './account.entity';

/**
 * Transaction Entity
 */
@Entity({ name: 'transactions' })
export class Transaction extends BaseEntity {
    /**
     * Column "account_id"
     */
    @Column({ type: 'uuid' })
    accountId: string;

    @ManyToOne(() => Account, (account) => account.transactions, {
        cascade: true,
    })
    @JoinColumn({ name: 'account_id' })
    account: Account;
    /**
     * Column "value"
     */
    @Column({ type: 'double precision' })
    value: number;

    /**
     * Column "transaction_date"
     */
    @Column({ type: 'date' })
    transactionDate: string;
}
