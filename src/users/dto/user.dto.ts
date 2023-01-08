import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { Role } from "../user.entity";

export class createUserDto {
	@IsNotEmpty()
	@MinLength(3)
	username: string;
	@MinLength(8)
	@IsNotEmpty()
	password: string;
	@IsNotEmpty()
	@IsEmail()
	email: string;

	role: Role;
}
