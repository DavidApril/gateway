import { Body, Controller, Delete, Get, Inject, Param, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/shared/dto';
import { NATS_SERVICE } from 'src/config';
import { CreateRoleDto } from '../dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('role')
@Controller('role')
export class RoleController {
	constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

	@Post('create')
	@ApiOperation({ summary: 'Create a new role' })
	@ApiResponse({ status: 201, description: 'The role has been successfully created.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	create(@Body() createRoleDto: CreateRoleDto) {
		return this.client.send('role.create', createRoleDto).pipe(
			catchError((e) => {
				throw new RpcException(e);
			})
		);
	}

	@Get(':term')
	@ApiOperation({ summary: 'Find one role by term' })
	@ApiResponse({ status: 200, description: 'Role found.' })
	@ApiResponse({ status: 404, description: 'Role not found.' })
	findOne(@Param('term') term: string) {
		return this.client.send('role.find.one', term).pipe(
			catchError((e) => {
				throw new RpcException(e);
			})
		);
	}

	@Get()
	@ApiOperation({ summary: 'Get all roles with pagination' })
	@ApiResponse({ status: 200, description: 'Roles retrieved successfully.' })
	findAll(@Query() paginationDto: PaginationDto) {
		return this.client.send('role.find.all', paginationDto).pipe(
			catchError((e) => {
				throw new RpcException(e);
			})
		);
	}

	@Delete(':term')
	@ApiOperation({ summary: 'Delete a role by term' })
	@ApiResponse({ status: 200, description: 'Role deleted successfully.' })
	@ApiResponse({ status: 404, description: 'Role not found.' })
	delete(@Param('term') term: string) {
		return this.client.send('role.delete.one', term).pipe(
			catchError((e) => {
				throw new RpcException(e);
			})
		);
	}

	@Delete()
	@ApiOperation({ summary: 'Delete all roles' })
	@ApiResponse({ status: 200, description: 'All roles deleted successfully.' })
	deleteAll() {
		return this.client.send('role.delete.all', {}).pipe(
			catchError((e) => {
				throw new RpcException(e);
			})
		);
	}
}
