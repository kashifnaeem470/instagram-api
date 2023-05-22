import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty, IsString } from "class-validator";
import { User } from "src/user/user.entity";
import { Post } from "src/post/post.entity";

@Entity('comment')
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column()
  content: string;

  @ManyToOne(() => User, (user: User) => user.comments, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Post, (post: Post) => post.comments, {
    onDelete: 'CASCADE',
  })
  post: Post;
}
