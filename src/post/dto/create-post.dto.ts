import { IsNotEmpty, IsOptional, IsString, isString } from "class-validator";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsNotEmpty()
    @IsString()
    picture:string;
}
