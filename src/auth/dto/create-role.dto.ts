import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateRoleDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	description: string;

	@IsString()
	@IsNotEmpty()
	owner: string;
}
