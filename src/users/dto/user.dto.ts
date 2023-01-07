import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export default class createUserDto {
  @IsNotEmpty()
  @MinLength(3)
  readonly username!: string;
  @IsNotEmpty()
  @IsEmail()
  readonly email!: string;
  @IsNotEmpty()
  @MinLength(8)
  readonly password!: string;
  @IsOptional()
  @IsString()
  readonly role?: 'Employee' | 'Admin' | 'ProjectManager';
}
