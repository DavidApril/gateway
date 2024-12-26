import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { TeamsModule } from './teams/teams.module';
@Module({
	imports: [AuthModule, ProjectsModule, TasksModule, TeamsModule],
})
export class AppModule {}
