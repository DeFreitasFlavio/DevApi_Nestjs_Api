import { Controller, Get } from "@nestjs/common";
import { ProjectsService } from "../services/projects.service";

@Controller('projects')
export class ProjectsController {
  constructor(
    private ProjectsService: ProjectsService
  ) {}

  // @Get()
  @Get('/projects')
  findAllProjects() {
    return this.ProjectsService.findAllProjects();
  }

  // @Post()
}
