import { Body, Controller, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { catchError } from 'rxjs';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateTeamDto, UpdateTeamDto } from './dto';
import { NATS_SERVICE } from 'src/config';
import { PaginationDto } from 'src/shared/dto';

@Controller('teams')
export class TeamsController {
	constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

	@Post('create')
	createTeam(@Body() createTeamDto: CreateTeamDto) {
		return this.client.send('teams.create', createTeamDto).pipe(
			catchError((e) => {
				console.error(e);
				throw new RpcException(e);
			})
		);
	}

	@Get()
	findAll() {
		return this.client.send('teams.find.all', {}).pipe(
			catchError((e) => {
				console.error(e);
				throw new RpcException(e);
			})
		);
	}

	@Get(':project_id')
	async findAllByStatus(@Param() project_id: string, @Query() paginationDto: PaginationDto) {
		try {
			return this.client.send('teams.find.all', {
				...paginationDto,
				project_id,
			});
		} catch (e) {
			throw new RpcException(e);
		}
	}

	@Get('id/:id')
	findOne(@Param('id') id: string) {
		return this.client.send('teams.find.one', id).pipe(
			catchError((e) => {
				console.error(e);
				throw new RpcException(e);
			})
		);
	}

	@Patch()
	update(@Body() updateTeamDto: UpdateTeamDto) {
		return this.client.send('teams.update', updateTeamDto).pipe(
			catchError((e) => {
				console.error(e);
				throw new RpcException(e);
			})
		);
	}
}
