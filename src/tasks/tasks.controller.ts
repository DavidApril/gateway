import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { catchError } from 'rxjs';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { NATS_SERVICE } from 'src/config';
import { PaginationDto } from 'src/shared/dto';

@Controller('tasks')
export class TasksController {
	constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

	@Post('create')
	createTask(@Body() createTaskDto: CreateTaskDto) {
		return this.client.send('tasks.create', createTaskDto).pipe(
			catchError((e) => {
				console.error(e);
				throw new RpcException(e);
			})
		);
	}

	@Get()
	findAll(@Query() paginationDto: PaginationDto) {
		return this.client.send('tasks.find.all', paginationDto).pipe(
			catchError((e) => {
				console.error(e);
				throw new RpcException(e);
			})
		);
	}

	@Get(':project_id')
	findAllByProjectId(@Param('project_id') project_id: string, @Query() paginationDto: PaginationDto) {
		return this.client.send('tasks.find.all', {
			...paginationDto,
			project_id: project_id,
		});
	}

	@Get('id/:id')
	findOne(@Param('id') id: string) {
		return this.client.send('tasks.find.one', id).pipe(
			catchError((e) => {
				console.error(e);
				throw new RpcException(e);
			})
		);
	}

	@Patch()
	update(@Body() updateTaskDto: UpdateTaskDto) {
		return this.client.send('tasks.update', updateTaskDto).pipe(
			catchError((e) => {
				console.error(e);
				throw new RpcException(e);
			})
		);
	}

	@Delete(':id')
	deleteProduct(@Param('id') id: string) {
		return this.client.send('tasks.delete', id).pipe(
			catchError((e) => {
				console.error(e);
				throw new RpcException(e);
			})
		);
	}
}
