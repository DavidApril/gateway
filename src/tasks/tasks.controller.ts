import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { catchError } from 'rxjs';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { NATS_SERVICE } from 'src/config';
import { PaginationDto } from 'src/shared/dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TaskPaginationDto } from './dto/task-pagination.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
	constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

	@Post('create')
	@ApiOperation({ summary: 'Create a new task' })
	@ApiResponse({ status: 201, description: 'The task has been successfully created.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	createTask(@Body() createTaskDto: CreateTaskDto) {
		return this.client.send('tasks.create', createTaskDto).pipe(
			catchError((e) => {
				console.error(e);
				throw new RpcException(e);
			})
		);
	}

	@Get()
	@ApiOperation({ summary: 'Get all tasks' })
	@ApiResponse({ status: 200, description: 'All tasks returned.' })
	findAll(@Query() paginationDto: TaskPaginationDto) {
		return this.client.send('tasks.find.all', paginationDto).pipe(
			catchError((e) => {
				console.error(e);
				throw new RpcException(e);
			})
		);
	}

	@Get(':project_id')
	@ApiOperation({ summary: 'Get tasks by project ID' })
	@ApiResponse({ status: 200, description: 'Tasks for the specified project ID returned.' })
	findAllByProjectId(@Param('project_id') project_id: string, @Query() paginationDto: PaginationDto) {
		return this.client.send('tasks.find.all', {
			...paginationDto,
			project_id: project_id,
		});
	}

	@Get('id/:id')
	@ApiOperation({ summary: 'Get a single task by ID' })
	@ApiResponse({ status: 200, description: 'Task details returned.' })
	@ApiResponse({ status: 404, description: 'Task not found.' })
	findOne(@Param('id') id: string) {
		return this.client.send('tasks.find.one', id).pipe(
			catchError((e) => {
				console.error(e);
				throw new RpcException(e);
			})
		);
	}

	@Patch()
	@ApiOperation({ summary: 'Update a task' })
	@ApiResponse({ status: 200, description: 'Task updated successfully.' })
	update(@Body() updateTaskDto: UpdateTaskDto) {
		return this.client.send('tasks.update', updateTaskDto).pipe(
			catchError((e) => {
				console.error(e);
				throw new RpcException(e);
			})
		);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete a task' })
	@ApiResponse({ status: 200, description: 'Task deleted successfully.' })
	@ApiResponse({ status: 404, description: 'Task not found.' })
	deleteProduct(@Param('id') id: string) {
		return this.client.send('tasks.delete', id).pipe(
			catchError((e) => {
				console.error(e);
				throw new RpcException(e);
			})
		);
	}
}
