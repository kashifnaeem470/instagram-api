import { IsNotEmpty, IsString } from "class-validator";
import { User } from "src/user/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('post')
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column()
  title: string;

  @Column({
    nullable: true,
  })
  @IsString()
  description: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(1)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(1)',
    onUpdate: 'CURRENT_TIMESTAMP(1)',
  })
  public updated_at: Date;

  @ManyToOne(() => User, (user: User) => user.posts, {
    onDelete: 'CASCADE',
  })
  user: User;
  
  @IsString()
  @Column({ nullable: false, default: '' })
  picture: string
}
