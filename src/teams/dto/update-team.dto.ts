import { CreateTeamDto } from 'src/projects/dto';
import { IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class UpdateTeamDto extends PartialType(CreateTeamDto) {
	@IsUUID()
	id: string;
}
