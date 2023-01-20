import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ClientCreateDto } from '../../controller/clients/dto/request/client.create.dto';

import { Client } from '../../model/client.entity';

/**
 * Service class for 'client' service
 */
@Injectable()
export class ClientRepositoryService {
    /**
     * Constructor
     */
    constructor(
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>,
    ) {}

    /**
     * Save client
     * @param client ClientCreateDto | Client object
     */
    public async save(client: ClientCreateDto | Client): Promise<Client> {
        try {
            return this.clientRepository.save(client);
        } catch (e) {
            throw new InternalServerErrorException();
        }
    }

    /**
     * Find one client
     * @param id Client id string
     */
    public async findOne(id: string): Promise<Client | null> {
        try {
            return await this.clientRepository.findOneByOrFail({ id });
        } catch (e) {
            return null;
        }
    }

    /**
     * Find one client by name
     * @param name Client name string
     */
    public async findOneByName(name: string): Promise<Client | null> {
        try {
            return await this.clientRepository.findOneByOrFail({ name });
        } catch (e) {
            return null;
        }
    }
    /**
     * Delete client by id
     * @param id Client id string
     */
    public async delete(id: string): Promise<void> {
        try {
            await this.clientRepository.delete(id);
        } catch (e) {
            return null;
        }
    }
}
