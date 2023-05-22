import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { ConfigModule } from '@nestjs/config';
import { Post } from './post/post.entity';
import { MailModule } from './mail/mail.module';
import { CommentModule } from './comment/comment.module';
import { Comment } from './comment/comment.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5431,
      username: 'postgres',
      password: 'admin',
      database: 'instagram',
      entities: [User,Post,Comment],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Post, Comment]),
    UserModule,
    PostModule,
    AuthModule,
    MailModule,
    CommentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
