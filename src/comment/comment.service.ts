import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { Post } from 'src/post/post.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  //create comment
  async create(postId: number, userId: number, createCommentDto: CreateCommentDto) {
    const post = await this.postRepository.findOne({
      where: {
        id: postId
      }
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const user = await this.userRepository.findOne({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const comment = new Comment();
    comment.content = createCommentDto.content;
    comment.user = user;
    comment.post = post;

    return await this.commentRepository.save(comment);
  }

  //edit comment
  async update(commentId: number, userId: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentRepository.findOne({
      where: {
        id: commentId,
        user: {
          id: userId,
        },
      },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    comment.content = updateCommentDto.content;

    return await this.commentRepository.save(comment);
  }

  //delete comment
  async remove(commentId: number, userId: number): Promise<void> {
    const comment = await this.commentRepository.findOne({
      where: {
        id: commentId,
        user: {
          id: userId,
        },
      },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    await this.commentRepository.remove(comment);
  }
}
