import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/post/decorators/current-user.decorator';


@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @Post(':postId')
  async createComment(
    @Param('postId') postId: number,
    @CurrentUser() user: { id: number },
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return await this.commentService.create(postId, user.id, createCommentDto);
  }

  @Patch(':id')
  async editComment(
    @Param('id') commentId: number,
    @CurrentUser() user: { id: number },
    @Body() updateCommentDto: UpdateCommentDto
  ) {
    return await this.commentService.update(commentId, user.id, updateCommentDto);
  }

  @Delete(':id')
  async deleteComment(
    @Param('id') commentId: number,
    @CurrentUser() user: { id: number }
  ) {
    return await this.commentService.remove(commentId, user.id);
  }
}
