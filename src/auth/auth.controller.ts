import { Controller, Post, Body, Get, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthInDto } from './dto/login.dto';
import { MailService } from 'src/mail/mail.service';
import { User } from 'src/user/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private mailservice: MailService) { }

    @UseInterceptors(FileInterceptor('file'))
    @Post('signup')
    async createUser(@Body() body: CreateUserDto, @UploadedFile() file:Express.Multer.File): Promise<User> {
        return await this.authService.createUser(body, file);
    }

    @Post('login')
    async login(@Body() dtoin: AuthInDto) {
        return this.authService.login(dtoin);
    }
}
