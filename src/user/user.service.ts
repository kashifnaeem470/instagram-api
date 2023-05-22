import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly cloudinaryService:CloudinaryService
  ) { }

  findAll(): Promise<User[]> {
    console.log('This action returns all user');
    return this.usersRepository.find();
  }

  async update(id: number, updateUserDto: UpdateUserDto, file: Express.Multer.File) {
    const user = await this.usersRepository.findOne({
      where: {
        id: id,
      }
    })

    if (!user) {
      throw new NotFoundException('User does not exists');
    }

    let imageLink = null;

    if (file) {
      const result = await this.cloudinaryService.uploadImage(file);
      imageLink = result.secure_url;
    }

    user.name = updateUserDto.name;
    user.username = updateUserDto.username;
    user.email = updateUserDto.email;
    user.password = updateUserDto.password;
    user.age = updateUserDto.age;
    user.picture = imageLink

    return this.usersRepository.save(user);
  }

  async remove(id: number) {
    await this.usersRepository.delete(id);
    return 'Account deleted successfully';
  }
}
