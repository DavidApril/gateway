import { IsString, IsUUID } from 'class-validator';
import { PaginationDto } from 'src/shared/dto';
import { ApiProperty } from '@nestjs/swagger';

export class CommentsPaginationDto extends PaginationDto {
	@ApiProperty({ description: 'The unique identifier of the resource', example: '123e4567-e89b-12d3-a456-426614174000' })
	@IsString()
	@IsUUID()
	resource_id: string;
}
