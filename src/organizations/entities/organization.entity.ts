import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Workspace } from '../../workspaces/entities/workspace.entity';

@Entity('organizations')
export class Organization extends BaseEntity {
  @Column({
    length: 150,
  })
  name: string;

  @Column({
    unique: true,
    length: 150,
  })
  slug: string;

  @OneToMany(() => Workspace, (workspace) => workspace.organization)
  workspaces: Workspace[];
}
