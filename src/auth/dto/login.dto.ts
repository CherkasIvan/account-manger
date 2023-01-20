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
        example: 'Иван Черкас',
        required: true,
    })
    @IsString()
    username: string;
}
