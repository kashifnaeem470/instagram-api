import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { AuthInDto } from './dto/login.dto';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/mail/mail.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()

export class AuthService {

    constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        private jwt: JwtService,
        private config: ConfigService,
        private mailservice: MailService) { }


    //resgister user
    async createUser(user: CreateUserDto): Promise<User> {
        const hashedPassword = await argon.hash(user.password);
        const newUser = this.usersRepository.create({
            username: user.username,
            name: user.name,
            email: user.email,
            password: hashedPassword,
            age: user.age,
        });
        return this.usersRepository.save(newUser);
    }

    //login
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

        // await this.mailservice.sendUserConfirmation(user);
        console.log('Welcome', user.id, user.username,);
        return this.signtoken( user.id, user.username)
       
    }

    async signtoken(id, username) {
        const secret = this.config.get('JWT_SECRET');
        const info = { id, username };
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
            select: ['username', 'password', 'email', 'id']
        });
        return user;
    }

}