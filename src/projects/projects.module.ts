import { Module } from '@nestjs/common';
import { NatsModule } from 'src/shared/transports';
import { ProjectsController } from './projects.controller';

@Module({
	controllers: [ProjectsController],
	imports: [NatsModule],
})
export class ProjectsModule {}
