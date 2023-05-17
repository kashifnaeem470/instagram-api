import { IsInt, IsString, IsOptional } from "class-validator";

export class CreateUserDto {
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

    // @IsString()
    // @IsOptional()
    // display_picture: string
}
