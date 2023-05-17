import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    @IsNotEmpty()
    @Column({ unique: true })
    username: string;

    @IsString()
    @IsNotEmpty()
    @Column()
    name: string;

    @IsString()
    @IsNotEmpty()
    @Column({ unique: true })
    email: string;

    @IsString()
    @IsNotEmpty()
    @Column({ select: false })
    password: string;

    @IsNumber()
    @Column()
    age: number

    // @IsString()
    // @IsOptional()
    // @Column({ default: '' })
    // display_picture: string

}