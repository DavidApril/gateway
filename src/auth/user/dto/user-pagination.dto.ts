import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { ValidRoles } from 'src/auth/interfaces';
import { PaginationDto } from 'src/shared/dto';

export class UserPaginationDto extends PaginationDto {
	@IsOptional()
	is_active?: boolean;

	@IsOptional()
	@IsArray()
	@IsEnum(ValidRoles, {
		each: true,
		message: `Invalid role. Allowed values: ${ValidRoles}`,
	})
	roles?: ValidRoles[];
}
