import { ApiProperty } from '@nestjs/swagger';

import { IsNumber, IsPositive } from 'class-validator';
/**
 * DTO for change balance
 */
export class BalanceRefillUpdateDto {
    /**
     * Column "value"
     */
    @ApiProperty({
        description: 'value',
        example: 1.3,
        required: true,
    })
    @IsNumber()
    @IsPositive()
    value: number;
}
