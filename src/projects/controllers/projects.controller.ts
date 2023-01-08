import { Body, Controller, ForbiddenException, Get, NotFoundException, Param, ParseUUIDPipe, Post, Request, UseGuards } from "@nestjs/common";
import { Roles } from "../../auth/decorators/roles.decorator";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guards";
import { RolesGuard } from "../../auth/guards/roles.guard";
import { ProjectUserServices } from "../../project-users/services/project-user.services";
import { UsersServices } from "../../users/services/user.service";
import { Role } from "../../users/user.entity";
import { ProjectDto } from "../dto/project.dto";
import { ProjectsServices } from "../services/projects.services";

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectController {

  constructor(
    private projectServices: ProjectsServices,
    private projectUserServices : ProjectUserServices,
    private usersServices : UsersServices
  ) {}

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  async createProject(@Body() projectDto : ProjectDto) {
    return await this.projectServices.createProject(projectDto);
  }

  @Get()
  async getProjectsByRole(@Request() req) {
    const user = await this.usersServices.findById(req.user.userId);
    if (user.role == Role.ADMIN || user.role == Role.PROJECTMANAGER) {
      return await this.projectServices.getProjects();
    } else {
      const projectUsers = await this.projectUserServices.getAllProjectUserByUserID(req.user.userId);
      return await Promise.all(
        projectUsers
          .map(projectUser => this.projectServices.getProjectById(projectUser.projectId))
      )
    }
  }

  @Get(':id')
  async getProjectById(@Request() req, @Param('id', new ParseUUIDPipe()) id: string) {
    const project = await this.projectServices.getProjectById(id);
    if (project) {
      const user = await this.usersServices.findById(req.user.userId);
      const projectUser = user.projectUser.filter(puser => puser.projectId == project.id);
      if (user.role == Role.EMPLOYEE && !projectUser.length) {
        throw new ForbiddenException();
      }
      return project;
    } else {
      throw new NotFoundException();
    }
  }

}
