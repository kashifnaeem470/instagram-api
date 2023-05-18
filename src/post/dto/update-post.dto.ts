import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    // @IsString()
    // @IsOptional()
    // picture:string;
}
