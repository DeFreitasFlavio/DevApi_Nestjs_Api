import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn 
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({unique: true})
  username!: string;

  @Column({unique: true})
  email!: string;
  
  @Column({nullable: false})
  password!: string;

  @Column({ default: "Employee" })
  role?: 'Employee' | 'Admin' | 'ProjectManager';
}

