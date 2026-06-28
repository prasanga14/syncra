import { Membership } from '../../memberships/entities/membership.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({
    length: 100,
  })
  name: string;

  @Column({
    unique: true,
    length: 255,
  })
  email: string;

  @Column({
    name: 'hashed_password',
  })
  hashedPassword: string;

  @Column({
    type: 'text',
    name: 'hashed_refresh_token',
    nullable: true,
  })
  hashedRefreshToken: string | null;

  @OneToMany(() => Membership, (membership) => membership.user)
  memberships: Membership[];
}
