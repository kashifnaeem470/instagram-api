import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5431,
      username: 'postgres',
      password: 'admin',
      database: 'instagram',
      entities: [],
      synchronize: true,
    }),
    UserModule,
    PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
