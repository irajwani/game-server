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

  @Column()
  public createdBy: string;

  @Column()
  public name: string;

  @Column('simple-array')
  public members: string[];

  @Column('jsonb')
  public messages: IMessage[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
