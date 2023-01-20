import { Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

import { configService } from '../../config/config.service';

import { AccountServiceModule } from '../../service/accounts/account-service.module';

import { AccountController } from './account.controller';

import { DAY_IN_SEC } from '../../utils/constans/constans';

@Module({
    imports: [
        ThrottlerModule.forRoot({
            ttl: DAY_IN_SEC,
            limit: Number(configService.getLimitBalanceCheck()),
        }),
        AccountServiceModule,
    ],
    controllers: [AccountController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class AccountControllerModule {}
