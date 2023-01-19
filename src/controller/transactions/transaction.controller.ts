import {
    Controller,
    Get,
    Param,
    ParseUUIDPipe,
    UseGuards,
} from '@nestjs/common';
import { Transaction } from '../../model/transaction.entity';
import { TransactionService } from '../../service/transactions/transaction.service';
import {
    ApiBearerAuth,
    ApiInternalServerErrorResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard';
import { CookieUser } from '../../utils/decorators/get-cookie-user';
import { LoginDto } from '../../auth/dto/login.dto';

/**
 * Controller class for 'transactions' endpoint
 */
@ApiTags('Transactions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('transactions')
export class TransactionController {
    /**
     * Constructor
     */
    constructor(private readonly transactionService: TransactionService) {}

    /**
     * Get transactions
     * @param accountId Account id string
     */
    @ApiOperation({ summary: 'Get transactions' })
    @ApiInternalServerErrorResponse()
    @Get('/:accountId')
    async getTransactions(
        @Param('accountId', ParseUUIDPipe) accountId: string,
        @CookieUser() cookieUser: LoginDto,
    ): Promise<Transaction[]> {
        return this.transactionService.findAllById(
            accountId,
            cookieUser.username,
        );
    }
}
