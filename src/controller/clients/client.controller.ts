import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';

import { LoginDto } from '../../auth/dto/login.dto';
import { ClientCreateDto } from './dto/request/client.create.dto';
import { ClientUpdateDto } from './dto/request/client.update.dto';

import { ClientService } from '../../service/clients/client.service';

import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard';

import { Client } from '../../model/client.entity';

import { CookieUser } from '../../utils/decorators/get-cookie-user';

/**
 * Controller class for 'clients' endpoint
 */
@ApiTags('Clients')
@Controller('clients')
export class ClientController {
    /**
     * Constructor
     */
    constructor(private readonly clientService: ClientService) {}

    /**
     * Create client
     * @param clientCreateDto ClientCreateDto object
     */
    @ApiOperation({ summary: 'Create client' })
    @ApiInternalServerErrorResponse()
    @Post('/')
    async createAccount(
        @Body() clientCreateDto: ClientCreateDto,
    ): Promise<Client> {
        return this.clientService.createClient(clientCreateDto);
    }

    /**
     * Get client by id
     * @param clientId Client id string
     */
    @ApiOperation({ summary: 'Get client by id' })
    @ApiNotFoundResponse()
    @ApiInternalServerErrorResponse()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('/:clientId')
    async getClient(
        @Param('clientId', ParseUUIDPipe) clientId: string,
        @CookieUser() cookieUser: LoginDto,
    ): Promise<Client> {
        return this.clientService.getClient(clientId, cookieUser.username);
    }

    /**
     * Update client by id
     * @param clientId Client id string
     * @param clientUpdateDto ClientUpdateDto object
     */
    @ApiOperation({ summary: 'Update client by id' })
    @ApiNotFoundResponse()
    @ApiInternalServerErrorResponse()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Put('/:clientId')
    async updateClient(
        @Param('clientId', ParseUUIDPipe) clientId: string,
        @Body() clientUpdateDto: ClientUpdateDto,
        @CookieUser() cookieUser: LoginDto,
    ): Promise<Client> {
        return this.clientService.updateClient(
            clientId,
            clientUpdateDto,
            cookieUser.username,
        );
    }

    /**
     * Delete client be id
     * @param clientId Client id string
     */
    @ApiOperation({ summary: 'Delete client be id' })
    @ApiNotFoundResponse()
    @ApiInternalServerErrorResponse()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete('/:clientId')
    async deleteClient(
        @Param('clientId', ParseUUIDPipe) clientId: string,
        @CookieUser() cookieUser: LoginDto,
    ): Promise<void> {
        return this.clientService.deleteClient(clientId, cookieUser.username);
    }
}
