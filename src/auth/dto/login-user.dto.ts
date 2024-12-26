import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'The email of the user' })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({ example: 'Password#2023', description: 'The strong password of the user' })
  @IsString()
  @IsStrongPassword()
  password: string;
}
