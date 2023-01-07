import { forwardRef, Module } from "@nestjs/common";
import { UsersService } from "./services/user.service";
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule)
  ],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService],
})

export class UserModule {}
