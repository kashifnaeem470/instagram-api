import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthInDto } from './dto/login.dto';
import { MailService } from 'src/mail/mail.service';
import { User } from 'src/user/user.entity';
import { CreateUserDto } from './dto/create-user.dto';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private mailservice: MailService) { }

    @Post('signup')
    async createUser(@Body() body: CreateUserDto): Promise<User> {
        return await this.authService.createUser(body);
    }

    @Post('login')
    async login(@Body() dtoin: AuthInDto) {
        return this.authService.login(dtoin);
    }
}
