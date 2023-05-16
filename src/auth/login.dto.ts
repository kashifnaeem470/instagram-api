import { Injectable } from "@nestjs/common";
import { IsNotEmpty, IsString, IsStrongPassword, isString } from "class-validator";

@Injectable()
export class AuthInDto {
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}