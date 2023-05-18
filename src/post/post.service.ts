import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) { }

  //create post
  async create(id: number, createPostDto: CreatePostDto) {
    const user = await this.usersRepository.findOne({
      where: {
        id: id,
      }
    })
    // const post = await this.postRepository.create({
    //   title: createPostDto.title,
    //   user: user
    // })
    const post = new Post();
    post.title = createPostDto.title;
    post.user = user;

    return this.postRepository.save(post);
  }

  //show all posts
  async findAll() {
    return await this.postRepository.find();
  }

  async getUserPosts(userId: number): Promise<Post[]> {
    const posts = await this.postRepository.find({
      where: {
        user: {
          id: userId
        }
      },
    });
    if (posts) {
      return posts;
    } else {
      console.log('Post not found')
    }
  }

  //edit post
  async edit(postId: number, userId: number, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.findOne({
      where: {
        id: postId,
        user: {
          id: userId
        }
      }
    })

    // const post = await this.postRepository
    //   .createQueryBuilder('post')
    //   .where('post.id = :postId', { postId })
    //   .andWhere('post.userId = :userId', { userId })
    //   .getOne();

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    post.title = updatePostDto.title;
    return this.postRepository.save(post);
  }

  //delete post
  async delete(postId: number, userId: number) {

    const post = await this.postRepository.findOne({
      where: {
        id: postId,
        user: {
          id: userId
        }
      }
    })

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return this.postRepository.delete(postId);
  }
}
