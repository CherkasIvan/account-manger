import { Entity, Column, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Account } from './account.entity';

/**
 * Client Entity
 */
@Entity({ name: 'clients' })
export class Client extends BaseEntity {
    /**
     * Column "name"
     */
    @Column({ type: 'varchar' })
    name: string;

    /**
     * Column "document"
     */
    @Column({ type: 'varchar' })
    document: string;

    /**
     * Column "birth_date"
     */
    @Column({ type: 'date' })
    birthDate: string;

    @OneToMany(() => Account, (account) => account.client)
    accounts: Account[];
}
