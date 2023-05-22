import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../../auth/dto/create-user.dto';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    username: string;

    @IsString()
    name: string;

    @IsString()
    email: string

    @IsString()
    password: string

    @IsInt()
    age: number;

    @IsNotEmpty()
    @IsString()
    picture: string
}
