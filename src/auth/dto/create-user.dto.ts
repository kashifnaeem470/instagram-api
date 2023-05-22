import { IsInt, IsString, IsNotEmpty } from "class-validator";

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

    @IsNotEmpty()
    @IsString()
    display_picture: string
}
