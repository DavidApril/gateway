import { CreateTeamDto } from 'src/projects/dto';
import { IsUUID } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdateTeamDto extends PartialType(CreateTeamDto) {
	@IsUUID()
	@ApiProperty({ description: 'The unique identifier for the team' }) // Add Swagger documentation
	id: string;
}
