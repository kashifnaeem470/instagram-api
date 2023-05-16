import { IsNotEmpty, IsString } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('post')
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    @IsNotEmpty()
    @Column()
    title: string;

    @IsString()
    @Column({ nullable: false, default: '' })
    picture: string
}
