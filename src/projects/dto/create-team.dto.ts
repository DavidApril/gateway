import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto {
	@ApiProperty({ description: 'The name of the team' })
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty({ description: 'A brief description of the team' })
	@IsString()
	@IsNotEmpty()
	description: string;

	@ApiProperty({ description: 'The UUID of the project this team belongs to' })
	@IsUUID()
	@IsNotEmpty()
	projectId: string;
}
