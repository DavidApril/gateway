import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
	@ApiProperty({ description: 'Page number of the results', example: 1, required: false })
	@IsPositive()
	@IsOptional()
	@IsNumber()
	@Min(1)
	@Type(() => Number)
	page: number = 1;

	@ApiProperty({ description: 'Number of results per page', example: 10, required: false })
	@IsPositive()
	@IsOptional()
	@IsNumber()
	@Min(1)
	@Type(() => Number)
	limit: number = 10;
}
