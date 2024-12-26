import { Module } from '@nestjs/common';
import { NatsModule } from 'src/shared/transports';
import { TasksController } from './tasks.controller';

@Module({
	controllers: [TasksController],
	imports: [NatsModule],
})
export class TasksModule {}
