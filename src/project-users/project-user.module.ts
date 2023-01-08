import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectUserController } from "../project-users/controllers/project-users.controller";
import { ProjectUser } from "./project-user.entity";
import { ProjectUserServices } from "../project-users/services/project-user.services";
import { ProjectsModule } from "../projects/project.module";
import { UserModule } from "../users/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([ProjectUser]), UserModule, forwardRef(() => ProjectsModule)],
  providers: [ProjectUserServices],
  controllers: [ProjectUserController],
  exports: [ProjectUserServices],
})
export class ProjectUserModule {}
