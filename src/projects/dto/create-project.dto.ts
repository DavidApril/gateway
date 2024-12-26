import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
	@ApiProperty({ description: 'The name of the project' })
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty({ description: 'The description of the project' })
	@IsString()
	@IsNotEmpty()
	description: string;

	@ApiProperty({ description: 'The UUID of the project owner' })
	@IsString()
	@IsNotEmpty()
	@IsUUID()
	owner: string;
}
