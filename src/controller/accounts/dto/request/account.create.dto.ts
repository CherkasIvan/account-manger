import { ApiProperty } from '@nestjs/swagger';

import { IsBoolean, IsNumber, IsPositive, IsString } from 'class-validator';

/**
 * DTO for creating "Account"
 */
export class AccountCreateDto {
    /**
     * Column "personId"
     */
    @ApiProperty({
        description: 'personId',
        example: '759ce177-ada1-4c78-a41e-6bea2eb5709b',
        required: true,
    })
    @IsString()
    personId: string;

    /**
     * Column "balance"
     */
    @ApiProperty({
        description: 'balance',
        example: 1.3,
        required: true,
    })
    @IsNumber()
    @IsPositive()
    balance: number;

    /**
     * Column "dailyWithdrawalLimit"
     */
    @ApiProperty({
        description: 'dailyWithdrawalLimit',
        example: 100,
        required: true,
    })
    @IsNumber()
    @IsPositive()
    dailyWithdrawalLimit: number;

    /**
     * Column "active"
     */
    @ApiProperty({
        description: 'active',
        example: true,
    })
    @IsBoolean()
    active?: boolean;

    /**
     * Column "accountType"
     */
    @ApiProperty({
        description: 'accountType',
        example: 1,
        required: true,
    })
    @IsNumber()
    @IsPositive()
    accountType: number;

    /**
     * Column "createDate"
     */
    @ApiProperty({
        description: 'date',
        example: '2020-10-11',
    })
    @IsString()
    createDate?: string;
}
