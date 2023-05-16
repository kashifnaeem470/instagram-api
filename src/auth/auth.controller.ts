import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth.guard';
import { AuthInDto } from './login.dto';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('auth/login')
    async login(@Body() dtoin: AuthInDto) {
        return this.authService.login(dtoin);
    }
}
