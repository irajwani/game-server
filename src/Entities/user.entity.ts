import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @Column()
  public name: string;

  @Column()
  public soft_currency: number;

  @Column()
  public hard_currency: number;

  // @Column('uuid', { array: true })
  // public clubs: string[];
}
