import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { ClientCreateDto } from '../../controller/clients/dto/request/client.create.dto';
import { ClientUpdateDto } from '../../controller/clients/dto/request/client.update.dto';

import { ClientRepositoryService } from '../../repository/clients/client-repository.service';
import { AccountRepositoryService } from '../../repository/accounts/account-repository.service';

import { Client } from '../../model/client.entity';

/**
 * Service class for 'client' controller
 */
@Injectable()
export class ClientService {
    constructor(
        protected readonly clientRepository: ClientRepositoryService,
        protected readonly accountRepository: AccountRepositoryService,
    ) {}

    /**
     * Create client
     * @param clientCreateDto ClientCreateDto object
     */
    public async createClient(
        clientCreateDto: ClientCreateDto,
    ): Promise<Client> {
        const savedClient = await this.clientRepository.save(clientCreateDto);
        return savedClient;
    }

    /**
     * Get client by id
     * @param clientId Client id string
     * @param cookieUsername cookieUsername string
     */
    public async getClient(
        clientId: string,
        cookieUsername: string,
    ): Promise<Client> {
        const client = await this.clientRepository.findOne(clientId);

        if (client?.name !== cookieUsername || !cookieUsername) {
            throw new ForbiddenException('You cannot see info this account');
        }

        if (!client) {
            throw new NotFoundException(`Client with id:${clientId} not found`);
        }

        return client;
    }

    /**
     * Get client by name
     * @param clientId Client id string
     */
    public async getClientByName(name: string): Promise<Client> {
        const client = await this.clientRepository.findOneByName(name);

        if (!client) {
            throw new NotFoundException(`Client with name:${name} not found`);
        }

        return client;
    }

    /**
     * Update client
     * @param clientId Client id string
     * @param clientUpdateDto ClientUpdateDto object
     * @param cookieUsername cookieUsername string
     */
    public async updateClient(
        clientId: string,
        clientUpdateDto: ClientUpdateDto,
        cookieUsername: string,
    ): Promise<Client> {
        const client = await this.clientRepository.findOne(clientId);

        if (client?.name !== cookieUsername || !cookieUsername) {
            throw new ForbiddenException('You cannot see info this account');
        }

        if (!client) {
            throw new NotFoundException(`Client with id:${clientId} not found`);
        }

        const updatedClient = await this.clientRepository.save(
            Object.assign(client, clientUpdateDto),
        );
        return updatedClient;
    }

    /**
     * Delete client
     * @param clientId Client id string
     * @param cookieUsername cookieUsername string
     */
    public async deleteClient(
        clientId: string,
        cookieUsername: string,
    ): Promise<void> {
        const client = await this.clientRepository.findOne(clientId);

        if (client?.name !== cookieUsername || !cookieUsername) {
            throw new ForbiddenException('You cannot see info this account');
        }
        if (!client) {
            throw new NotFoundException(`Client with id:${clientId} not found`);
        }

        await this.accountRepository.deleteByClientId(clientId);
        await this.clientRepository.delete(clientId);
    }
}
