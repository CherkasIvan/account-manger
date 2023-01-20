import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

/**
 * DTO for creating "Account"
 */
export class LoginDto {
    /**
     * Column "createDate"
     */
    @ApiProperty({
        description: 'name',
        example: 'John Doe',
        required: true,
    })
    @IsString()
    username: string;
}
