import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsDate } from 'class-validator';

/**
 * DTO for update "Client"
 */
export class ClientUpdateDto {
    /**
     * Column "name"
     */
    @ApiProperty({
        description: 'Name of client',
        example: 'John Doe',
    })
    @IsString()
    name?: string;

    /**
     * Column "document"
     */
    @ApiProperty({
        description: 'Document',
        example: '12234FFASBV5',
    })
    @IsString()
    document?: string;

    /**
     * Column "birthDate"
     */
    @ApiProperty({
        description: 'Birth date',
        example: '2020-10-11',
    })
    @IsDate()
    birthDate?: string;
}
