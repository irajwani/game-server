import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from './user.entity';
import Club from './club.entity';
import Constants from '../Common/constants';

const { DONATION_REQUEST_AMOUNT } = Constants;

@Entity()
export default class DonationRequest {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public userId: string;

  @Column()
  public clubId: string;

  @Column({ default: DONATION_REQUEST_AMOUNT })
  public requested: number;

  @Column({ default: 0 })
  public donated: number;

  @Column({ default: 0 })
  public excess: number;

  @Column('boolean', { default: false })
  public isFulfilled = false;

  @Column('boolean', { default: false })
  public hasExpired = false;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
