import { ApiProperty } from '@nestjs/swagger';

import { IsDate, IsString } from 'class-validator';

/**
 * DTO for creating "Client"
 */
export class ClientCreateDto {
    /**
     * Column "name"
     */
    @ApiProperty({
        description: 'Name of client',
        example: 'Иван Черкас',
        required: true,
    })
    @IsString()
    name: string;

    /**
     * Column "document"
     */
    @ApiProperty({
        description: 'Document',
        example: '12234FFASBV5',
        required: true,
    })
    @IsString()
    document: string;

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
