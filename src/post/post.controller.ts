import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) { }

  //create post
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async createPost(@CurrentUser() User: { username: string, id: number }, 
  @Body({} as any) createPostDto: CreatePostDto,
  @UploadedFile() file:Express.Multer.File ) {
    return await this.postService.create(User.id, createPostDto, file);
  }

  //show all posts
  @Get()
  async getAllPosts() {
    return await this.postService.findAll();
  }

  //show user posts
  @Get('user-posts')
  async getUserPosts(@CurrentUser() user: { id: number }): Promise<any[]> {
    return await this.postService.getUserPosts(user.id);
  }

  //edit post
  @UseInterceptors(FileInterceptor('file'))
  @Patch(':id')
  async editPost(
    @Param('id') postId: number,
    @CurrentUser() user: { id: number },
    @Body() updatePostDto: UpdatePostDto
  ) {
    return await this.postService.edit(postId, user.id, updatePostDto);
  }

  //delete post
  @Delete(':id')
  async deletePost(
    @Param('id') postId: number, @CurrentUser() user: { id: number }) {
    return await this.postService.delete(postId, user.id);
  }
}
