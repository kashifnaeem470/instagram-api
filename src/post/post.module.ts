import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Post])],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
