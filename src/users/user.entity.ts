import { IsEmail } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectUser } from '../project-users/project-user.entity';

export enum Role {
	EMPLOYEE = "Employee",
	ADMIN = "Admin",
	PROJECTMANAGER = "ProjectManager"
}

@Entity('user')
export class User {

	@PrimaryGeneratedColumn('uuid')
	public id!: string; //au format uuidv4

	@Column({ unique: true })
	public username!: string; // cette propriété doit porter une contrainte d'unicité
	@Column({ unique: true })
	@IsEmail()
	public email!: string; // cette propriété doit porter une contrainte d'unicité
	@Column()
	public password!: string;
	@Column({
		type: 'enum',
		enum: Role,
		default: Role.EMPLOYEE
	})
	public role!: Role;

	@OneToMany(() => ProjectUser, (puser: ProjectUser) => puser.user)
	public projectUser : ProjectUser[]
}
