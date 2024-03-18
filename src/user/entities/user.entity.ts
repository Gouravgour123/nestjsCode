import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {

    // @PrimaryGeneratedColumn()
    // id: number;

    // @Column()
    // firstName: string;

    // @Column()
    // lastName: string;

    // @Column()
    // age: number;
  

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  mobile: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({ nullable: true })
  profilepic: string;

  
}

