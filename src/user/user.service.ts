import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }


  // create(createUserDto: CreateUserDto) {
  //   console.log('This action adds a new user');
  //   return this.usersRepository.create(createUserDto);
  // }

  async createUser(username: string, password: string): Promise<User> {
    return this.usersRepository.save({username, password,});
}

  async getUser(query: object): Promise<User> {
    return this.usersRepository.findOne(query);
  }

  findAll(): Promise<User[]> {
    console.log('This action returns all user');
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
