import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public email: string;

  @Column()
  private password: string;

  @Column()
  public name: string;

  @Column()
  public soft_currency: number;

  @Column()
  public hard_currency: number;
}
