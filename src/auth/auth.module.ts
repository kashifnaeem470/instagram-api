import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
// import { LocalStrategy } from './local.auth';
import { jwtConatstant } from './jwt.constant';
import { JwtAuthGuard } from './auth.guard';
import { Repository } from 'typeorm';
import { MailService } from 'src/mail/mail.service';


@Module({
  imports: [UserModule, PassportModule, JwtModule.register({
    global: true,
  
  }), 
  TypeOrmModule.forFeature([User])],
  providers: [AuthService, UserService,JwtAuthGuard, Repository, MailService],
  exports: [JwtAuthGuard, AuthService],
  controllers: [AuthController],
})
export class AuthModule { }