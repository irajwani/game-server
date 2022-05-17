import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  Column,
  CreateDateColumn,
} from 'typeorm';
import User from './user.entity';

@Entity()
export default class Token {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public tokenCode: string;

  @Column()
  public userId: string;

  @OneToOne(() => User)
  @JoinColumn()
  public user: User;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
