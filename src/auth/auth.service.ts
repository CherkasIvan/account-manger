import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LoginDto } from './dto/login.dto';

import { ClientService } from '../service/clients/client.service';

@Injectable()
export class AuthService {
    constructor(
        private clientService: ClientService,
        private jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDto) {
        const user = await this.clientService.getClientByName(
            loginDto.username,
        );

        const payload = { username: user.name };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
