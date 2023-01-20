import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Transaction } from './transaction.entity';
import { Client } from './client.entity';

/**
 * Account Entity
 */
@Entity({ name: 'accounts' })
export class Account extends BaseEntity {
    /**
     * Column "person_id"
     */
    @Column({ type: 'uuid' })
    personId: string;

    @OneToMany(() => Transaction, (transaction) => transaction.account)
    transactions: Transaction[];

    @ManyToOne(() => Client, (client) => client.accounts, {
        cascade: true,
    })
    @JoinColumn({ name: 'person_id' })
    client: Client;
    /**
     * Column "balance"
     */
    @Column({ type: 'double precision' })
    balance: number;

    /**
     * Column "daily_withdrawal_limit"
     */
    @Column({ type: 'double precision' })
    dailyWithdrawalLimit: number;

    /**
     * Column "active"
     */
    @Column({ type: 'boolean' })
    active: boolean;

    /**
     * Column "account_type"
     */
    @Column({ type: 'integer' })
    accountType: number;

    /**
     * Column "create_date"
     */
    @Column({ type: 'date' })
    createDate: string;
}
