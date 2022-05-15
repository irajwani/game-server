import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IMessage } from '../Club/Types/message';

@Entity()
export default class Club {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ unique: true })
  public name: string;

  @Column('simple-array')
  public members: string[];

  @Column('simple-array')
  public messages: IMessage[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
