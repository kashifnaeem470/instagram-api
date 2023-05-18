import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) { }
  // @Post(':id/add-post')
  // createPost(@Param('id')id :number, @Body() createPostDto: CreatePostDto) {
  //   return this.postService.create(id,createPostDto);
  // }

  //create post
  @Post('new')
  createPost(@CurrentUser() User: { username: string, id: number }, @Body() createPostDto: CreatePostDto) {
    return this.postService.create(User.id, createPostDto);
  }

  //show all posts
  @Get()
  getAllPosts() {
    return this.postService.findAll();
  }
  
  //show user posts
  @Get('user-posts')
  async getUserPosts(@CurrentUser() user: { id: number }): Promise<any[]> {
    return this.postService.getUserPosts(user.id);
  }

  //edit post
  @Patch(':id')
  async editPost(
    @Param('id') postId: number,
    @CurrentUser() user: { id: number },
    @Body() updatePostDto: UpdatePostDto
  ) {
    return this.postService.edit(postId, user.id, updatePostDto);
  }

  //delete post
  @Delete(':id')
  async deletePost(
    @Param('id') postId: number, @CurrentUser() user: { id: number }) {
    return this.postService.delete(postId, user.id);
  }
}
