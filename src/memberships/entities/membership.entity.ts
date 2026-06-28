import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { MembershipRole } from '../membership-role.enum';
import { User } from '../../users/entities/user.entity';
import { BaseEntity } from '../../common/entities/base.entity';
import { Workspace } from '../../workspaces/entities/workspace.entity';

@Unique(['user', 'workspace'])
@Entity('memberships')
export class Membership extends BaseEntity {
  @Column({
    enum: MembershipRole,
    type: 'enum',
  })
  role: MembershipRole;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.memberships, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;

  @JoinColumn({ name: 'workspace_id' })
  @ManyToOne(() => Workspace, (workspace) => workspace.memberships, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  workspace: Workspace;
}
