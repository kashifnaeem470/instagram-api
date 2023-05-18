import { IsNotEmpty, IsString } from "class-validator";
import { User } from "src/user/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('post')
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    @IsNotEmpty()
    @Column()
    title: string;

    @ManyToOne(() => User, (user: User) => user.posts, {
        onDelete: 'CASCADE',
      })
      user: User;

    // @IsString()
    // @Column({ nullable: false, default: '' })
    // picture: string
}
