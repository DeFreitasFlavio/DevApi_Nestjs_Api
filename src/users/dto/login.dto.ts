import { IsEmail, IsNotEmpty } from "class-validator";

export default class loginUserDto {

  @IsEmail()
  @IsNotEmpty()
  readonly email!: string;
  @IsEmail()
  @IsNotEmpty()
  readonly password!: string;
}
