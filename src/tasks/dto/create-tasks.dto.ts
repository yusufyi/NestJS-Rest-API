import { IsNotEmpty } from 'class-validator';
//Download npm i class-validator to use @IsNotEmpty() decorator
//This DTO is used to validate the data sent to the createTask route
//The title and description fields are required
//If the title or description fields are missing, a 400 Bad Request response is returned

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}
