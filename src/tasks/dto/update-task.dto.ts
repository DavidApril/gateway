import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { IsUUID } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
	@IsUUID()
	id: string;
}