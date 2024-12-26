import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data transfer object for creating a new role.
 */
export class CreateRoleDto {
	/**
	 * The name of the role.
	 */
	@ApiProperty({ description: 'The name of the role.' })
	@IsString()
	@IsNotEmpty()
	name: string;

	/**
	 * A brief description of the role.
	 */
	@ApiProperty({ description: 'A brief description of the role.' })
	@IsString()
	@IsNotEmpty()
	description: string;

	/**
	 * The identifier of the owner of the role.
	 */
	@ApiProperty({ description: 'The identifier of the owner of the role.' })
	@IsString()
	@IsNotEmpty()
	owner: string;
}
