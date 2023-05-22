import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Comment } from "src/comment/comment.entity";
import { Post } from "src/post/post.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[];

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];

    // @IsString()
    // @IsOptional()
    // @Column({ default: '' })
    // display_picture: string
}