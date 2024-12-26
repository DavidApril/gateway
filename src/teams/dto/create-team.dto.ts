import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTeamDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	description: string;

	@IsUUID()
	@IsNotEmpty()
	project_id: string;

	@IsUUID()
	@IsNotEmpty()
	owner: string;

	@IsArray()
	@IsOptional()
	members: string[];
}
