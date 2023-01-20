import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { configService } from './config/config.service';

import { AccountControllerModule } from './controller/accounts/account-controller.module';
import { TransactionControllerModule } from './controller/transactions/transaction-controller.module';
import { ClientControllerModule } from './controller/clients/client-controller.module';
import { AuthModule } from './auth/auth.module';

import { AuthController } from './auth/auth.controller';

@Module({
    imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        AccountControllerModule,
        TransactionControllerModule,
        ClientControllerModule,
        AuthModule,
    ],
    controllers: [AuthController],
    providers: [],
})
export class AppModule {}
