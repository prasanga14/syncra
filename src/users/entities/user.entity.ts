import { Membership } from 'src/memberships/entities/membership.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';

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
    name: 'hashed_refresh_token',
    nullable: true,
  })
  hashedRefreshToken: string | null;

  @OneToMany(() => Membership, (membership) => membership.user)
  memberships: Membership[];
}
