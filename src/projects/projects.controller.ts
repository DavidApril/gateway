import { Body, Controller, Get, Inject, Param, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { CreateProjectDto } from './dto/create-project.dto';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/shared/dto';

@Controller('projects')
export class ProjectsController {
	constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

	@Post('create')
	createProject(@Body() createProjectDto: CreateProjectDto) {
		return this.client.send('projects.create', createProjectDto).pipe(
			catchError((e) => {
				throw new RpcException(e);
			})
		);
	}

	@Get()
	getProjects(@Query() paginationDto: PaginationDto) {
		return this.client.send('projects.find.all', paginationDto).pipe(
			catchError((e) => {
				throw new RpcException(e);
			})
		);
	}

	@Get(':searching_term')
	getProjectByTerm(@Param('searching_term') searching_term: string) {
		return this.client.send('projects.find.one', searching_term).pipe(
			catchError((e) => {
				console.log(e);
				throw new RpcException(e);
			})
		);
	}
}
