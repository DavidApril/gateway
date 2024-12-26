import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateProjectDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	description: string;

	@IsString()
	@IsNotEmpty()
	@IsUUID()
	owner: string;
}
