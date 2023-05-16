import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { AuthInDto } from './login.dto';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()

export class AuthService {

    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>, private jwt: JwtService, private config: ConfigService) { }

    async login(dtoin: AuthInDto) {
        const { password, username } = dtoin;
        const user = await this.validateUser(username);
        if (!user) {
            throw new ForbiddenException('Credentials incorrect');
        }
        const pwMatches = await argon.verify(user.password, password);
        if (!pwMatches) {
            throw new ForbiddenException('Credentials incorrect');
        }
        console.log('hiiiiiiii user', user);
        return this.signtoken(user.username)

        // return this.signtoken(customer.id, customer.email, customer.role); // Pass the customer.id as the first argument
    }

    async signtoken(username) {
        const secret = this.config.get('JWT_SECRET');
        const info = { username };
        const token = await this.jwt.sign(info, {
            expiresIn: '50m',
            secret: secret,
        });
        return {
            access_token: token,
        };
    }

    async validateUser(username: string) {
        const user = await this.usersRepository.findOne({
            where: {
                username: username
            },
            select: ['username', 'password']
        });
        return user;
    }

}