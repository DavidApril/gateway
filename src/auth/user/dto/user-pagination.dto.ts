import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { ValidRoles } from 'src/auth/interfaces';
import { PaginationDto } from 'src/shared/dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UserPaginationDto extends PaginationDto {
	@IsOptional()
	@ApiPropertyOptional({ description: 'Filter users by active status', example: true })
	is_active?: boolean;

	@IsOptional()
	@IsArray()
	@IsEnum(ValidRoles, {
		each: true,
		message: `Invalid role. Allowed values: ${ValidRoles}`,
	})
	@ApiPropertyOptional({
		description: 'Filter users by roles',
		example: [ValidRoles.ADMIN, ValidRoles.USER],
		isArray: true,
		enum: ValidRoles,
	})
	roles?: ValidRoles[];
}
