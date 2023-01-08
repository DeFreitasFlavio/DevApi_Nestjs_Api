import { IsDate, IsUUID } from "class-validator";

export class createProjectUsersDto {
  @IsDate()
  startDate!: Date;
  @IsDate()
  endDate!: Date;
  @IsUUID()
  userId!: string;
  @IsUUID()
  projectId!: string;
}
