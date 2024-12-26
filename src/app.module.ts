import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { TeamsModule } from './teams/teams.module';
import { CommentsModule } from './comments/comments.module';
@Module({
	imports: [AuthModule, ProjectsModule, TasksModule, TeamsModule, CommentsModule],
})
export class AppModule {}
