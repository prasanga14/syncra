import { BaseEntity } from '../../common/entities/base.entity';
import { Membership } from '../../memberships/entities/membership.entity';
import { Organization } from '../../organizations/entities/organization.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';

@Unique(['organization', 'name'])
@Entity('workspaces')
export class Workspace extends BaseEntity {
  @Column({
    length: 150,
  })
  name: string;

  @OneToMany(() => Membership, (membership) => membership.workspace)
  memberships: Membership[];

  @JoinColumn({ name: 'organization_id' })
  @ManyToOne(() => Organization, (organization) => organization.workspaces, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  organization: Organization;
}
