import { Body, Controller, Delete, Get, Inject, Param, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/shared/dto';
import { NATS_SERVICE } from 'src/config';
import { CreateRoleDto } from '../dto';

@Controller('role')
export class RoleController {
	constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

	@Post('create')
	create(@Body() createRoleDto: CreateRoleDto) {
		return this.client.send('role.create', createRoleDto).pipe(
			catchError((e) => {
				throw new RpcException(e);
			})
		);
	}

	@Get(':term')
	findOne(@Param('term') term: string) {
		return this.client.send('role.find.one', term).pipe(
			catchError((e) => {
				throw new RpcException(e);
			})
		);
	}

	@Get()
	findAll(@Query() paginationDto: PaginationDto) {
		return this.client.send('role.find.all', paginationDto).pipe(
			catchError((e) => {
				throw new RpcException(e);
			})
		);
	}

	@Delete(':term')
	delete(@Param('term') term: string) {
		return this.client.send('role.delete.one', term).pipe(
			catchError((e) => {
				throw new RpcException(e);
			})
		);
	}

	@Delete()
	deleteAll() {
		return this.client.send('role.delete.all', {}).pipe(
			catchError((e) => {
				throw new RpcException(e);
			})
		);
	}
}
