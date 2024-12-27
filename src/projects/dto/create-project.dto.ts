import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
	@ApiProperty({ description: 'The name of the project', example: 'Task Management App' })
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty({ description: 'The description of the project', example: 'Application for projects management' })
	@IsString()
	@IsNotEmpty()
	description: string;

	@ApiProperty({ description: 'The UUID of the project owner', example: 'c8661452-f705-49ee-a4b7-d09a5d586ee4' })
	@IsString()
	@IsNotEmpty()
	@IsUUID()
	owner: string;
}
