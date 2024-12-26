import { PartialType } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { RegisterUserDto } from 'src/auth/dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(RegisterUserDto) {
	@IsString()
	@IsUUID()
	@ApiProperty({ description: 'The unique identifier for the user', example: '123e4567-e89b-12d3-a456-426614174000' })
	id: string;
}
