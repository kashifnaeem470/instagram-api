import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import * as argon from 'argon2';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/post/decorators/current-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseInterceptors(FileInterceptor('file'))
  @Patch()
  update(@Body() updateUserDto: UpdateUserDto, 
  @CurrentUser() user: { id: number }, 
  @UploadedFile() file:Express.Multer.File) {
    return this.userService.update(user.id, updateUserDto, file);
  }

  @Delete()
  async remove(@CurrentUser() user: { id: number }) {
    return await this.userService.remove(user.id);
  }
}
