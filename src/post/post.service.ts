import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';


@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly cloudinaryService:CloudinaryService
  ) { }

  //create post
  async create(id: number, createPostDto: CreatePostDto, file: Express.Multer.File) {
    const user = await this.usersRepository.findOne({
      where: {
        id: id,
      }
    })
    // const post = await this.postRepository.create({
    //   title: createPostDto.title,
    //   user: user
    // })
    let imageLink = null;

    if (file) {
      const result = await this.cloudinaryService.uploadImage(file); // use CloudinaryService to upload image
      imageLink = result.secure_url;
    }

    const post = new Post();
    post.title = createPostDto.title;
    post.description = createPostDto.description;
    post.picture = imageLink;
    post.user = user;

    return await this.postRepository.save(post);
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

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    post.title = updatePostDto.title;
    post.description = updatePostDto.description;

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
