import { TaskStatus } from '../tasks.models';
//this is a DTO (Data Transfer Object) that will be used to filter tasks
//The DTO is used to validate the data sent to the getTasks route
//The status field is optional
export class GetTasksFilterDto {
  status?: TaskStatus;
  search?: string;
}
