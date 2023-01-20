import {
    Body,
    Controller,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { AuthGuard } from '@nestjs/passport';

import { AccountCreateDto } from './dto/request/account.create.dto';
import { BalanceRefillUpdateDto } from './dto/request/balance-refill.update.dto';
import { GetBalanceDto } from './dto/response/get-balance.dto';
import { LoginDto } from '../../auth/dto/login.dto';

import { AccountService } from '../../service/accounts/account.service';

import { Account } from '../../model/account.entity';

import { CookieUser } from '../../utils/decorators/get-cookie-user';
import { ChangeBalanceTypeEnum } from '../../utils/enums/change-balance-type.enum';
/**
 * Controller class for 'accounts' endpoint
 */
@ApiTags('Accounts')
@SkipThrottle()
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('accounts')
export class AccountController {
    /**
     * Constructor
     */
    constructor(private readonly accountService: AccountService) {}

    /**
     * Create account
     * @param accountCreateDto AccountCreateDto object
     */
    @ApiOperation({ summary: 'Create account' })
    @ApiInternalServerErrorResponse()
    @Post('/')
    async createAccount(
        @Body() accountCreateDto: AccountCreateDto,
    ): Promise<Account> {
        return this.accountService.createAccount(accountCreateDto);
    }

    /**
     * Change balance
     * @param id Account id string
     * @param type ChangeBalanceTypeEnum enum
     * @param balanceRefillUpdateDto BalanceRefillUpdateDto object
     */
    @ApiOperation({ summary: 'Change balance' })
    @ApiNotFoundResponse()
    @ApiInternalServerErrorResponse()
    @ApiQuery({ name: 'type', enum: ChangeBalanceTypeEnum })
    @Put('/:id/change-balance')
    async increaseBalance(
        @Param('id', ParseUUIDPipe) id: string,
        @Query('type') type: ChangeBalanceTypeEnum,
        @Body() balanceRefillUpdateDto: BalanceRefillUpdateDto,
        @CookieUser() cookieUser: LoginDto,
    ): Promise<Account> {
        return this.accountService.changeBalance(
            id,
            type,
            balanceRefillUpdateDto,
            cookieUser.username,
        );
    }

    /**
     * Change status
     * @param id Account id string
     * @param active Status boolean
     */
    @ApiOperation({ summary: 'Change status' })
    @ApiNotFoundResponse()
    @ApiInternalServerErrorResponse()
    @Put('/:id/change-status')
    async changeStatus(
        @Param('id', ParseUUIDPipe) id: string,
        @Query('active') active: boolean,
        @CookieUser() cookieUser: LoginDto,
    ): Promise<Account> {
        return this.accountService.changeStatus(
            id,
            active,
            cookieUser.username,
        );
    }

    /**
     * Get account balance
     * @param id Account id string
     */
    @ApiOperation({ summary: 'Get account balance' })
    @ApiNotFoundResponse()
    @ApiInternalServerErrorResponse()
    @SkipThrottle(false)
    @Get('/:id/get-balance')
    async getBalance(
        @Param('id', ParseUUIDPipe) id: string,
        @CookieUser() cookieUser: LoginDto,
    ): Promise<GetBalanceDto> {
        return this.accountService.getBalance(id, cookieUser.username);
    }
}
