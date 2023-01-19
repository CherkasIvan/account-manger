import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientRepositoryService } from './client-repository.service';
import { Client } from '../../model/client.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Client])],
    providers: [ClientRepositoryService],
    exports: [ClientRepositoryService],
})
export class ClientRepositoryModule {}
