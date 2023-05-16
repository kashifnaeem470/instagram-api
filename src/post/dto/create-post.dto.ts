import { IsNotEmpty, IsString } from "class-validator";
import { Column } from "typeorm";

export class CreatePostDto {

    @IsString()
    @IsNotEmpty()
    
    title: string;
}
