import { IsBoolean, IsEmail, IsOptional, IsString, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
	@ApiProperty({ example: 'John Doe', description: 'The name of the user' })
	@IsString()
	name: string;

	@ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
	@IsEmail()
	@IsString()
	email: string;

	@ApiProperty({ example: 'StrongPassword123!', description: 'A strong password for the user account' })
	@IsString()
	@IsStrongPassword()
	password: string;

	@ApiProperty({ example: true, description: 'Is the user account active', required: false })
	@IsBoolean()
	@IsOptional()
	is_active: boolean = true;
}
