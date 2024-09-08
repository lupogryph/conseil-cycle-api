import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('user')
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  prenom: string;

  @Column()
  nom: string;

  @Exclude()
  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: ['ADMIN', 'OPERATOR', 'INVITE'],
    default: 'INVITE',
  })
  role: 'ADMIN' | 'OPERATOR' | 'INVITE';

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
