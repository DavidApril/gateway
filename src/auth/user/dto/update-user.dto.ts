import { PartialType } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { RegisterUserDto } from 'src/auth/dto';

export class UpdateUserDto extends PartialType(RegisterUserDto) {
  @IsString()
  @IsUUID()
  id: string;
}
