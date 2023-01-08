import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProjectUser } from "../project-users/project-user.entity";

@Entity('project')
export class Project {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({ type: "uuid" })
  referringEmployeeId!: string;

  @OneToMany(() => ProjectUser, (puser: ProjectUser) => puser.project)
  public projectUser : ProjectUser[]
}
