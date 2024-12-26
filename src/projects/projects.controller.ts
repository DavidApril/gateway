import { Body, Controller, Get, Inject, Param, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { CreateProjectDto } from './dto/create-project.dto';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/shared/dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
	constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

	@Post('create')
	@ApiOperation({ summary: 'Create a new project' })
	@ApiResponse({ status: 201, description: 'Project created successfully' })
	@ApiResponse({ status: 400, description: 'Bad Request' })
	createProject(@Body() createProjectDto: CreateProjectDto) {
		return this.client.send('projects.create', createProjectDto).pipe(
			catchError((e) => {
				throw new RpcException(e);
			})
		);
	}

	@Get()
	@ApiOperation({ summary: 'Get all projects with pagination' })
	@ApiResponse({ status: 200, description: 'Projects retrieved successfully' })
	@ApiResponse({ status: 400, description: 'Bad Request' })
	getProjects(@Query() paginationDto: PaginationDto) {
		return this.client.send('projects.find.all', paginationDto).pipe(
			catchError((e) => {
				throw new RpcException(e);
			})
		);
	}

	@Get(':searching_term')
	@ApiOperation({ summary: 'Get a project by search term' })
	@ApiResponse({ status: 200, description: 'Project found' })
	@ApiResponse({ status: 404, description: 'Project not found' })
	getProjectByTerm(@Param('searching_term') searching_term: string) {
		return this.client.send('projects.find.one', searching_term).pipe(
			catchError((e) => {
				console.log(e);
				throw new RpcException(e);
			})
		);
	}
}
