import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
	@ApiProperty({ description: 'The UUID of the author', example: '61b3f6ad-4a09-44c7-a3b4-6cd8bd55d473' })
	@IsUUID()
	author_id: string;

	@ApiProperty({ description: 'The content of the comment', example: 'This is a comment.' })
	@IsString()
	content: string;

	@ApiProperty({ description: 'The UUID of the resource the comment is related to', example: '15d01d31-12da-4929-b651-f53d1cbd9487' })
	@IsUUID()
	resource_id: string;
}
