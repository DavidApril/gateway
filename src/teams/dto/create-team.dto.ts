import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class CreateTeamDto {
	@ApiProperty({ description: 'The name of the team', example: 'Inlaze' })
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty({ description: 'A brief description of the team', example: 'Develop team of Inlaze' })
	@IsString()
	@IsNotEmpty()
	description: string;
}
