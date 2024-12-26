import { Body, Controller, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { catchError } from 'rxjs';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateTeamDto, UpdateTeamDto } from './dto';
import { NATS_SERVICE } from 'src/config';
import { PaginationDto } from 'src/shared/dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('teams')
@Controller('teams')
export class TeamsController {
	constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

	@Post('create')
	@ApiOperation({ summary: 'Create a new team' })
	@ApiResponse({ status: 201, description: 'The team has been successfully created.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	createTeam(@Body() createTeamDto: CreateTeamDto) {
		return this.client.send('teams.create', createTeamDto).pipe(
			catchError((e) => {
				console.error(e);
				throw new RpcException(e);
			})
		);
	}

	@Get()
	@ApiOperation({ summary: 'Get all teams' })
	@ApiResponse({ status: 200, description: 'All teams returned.' })
	findAll() {
		return this.client.send('teams.find.all', {}).pipe(
			catchError((e) => {
				console.error(e);
				throw new RpcException(e);
			})
		);
	}

	@Get(':project_id')
	@ApiOperation({ summary: 'Get all teams by project status' })
	@ApiResponse({ status: 200, description: 'All teams for the project returned.' })
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
	@ApiOperation({ summary: 'Find one team by ID' })
	@ApiResponse({ status: 200, description: 'Team found.' })
	@ApiResponse({ status: 404, description: 'Team not found.' })
	findOne(@Param('id') id: string) {
		return this.client.send('teams.find.one', id).pipe(
			catchError((e) => {
				console.error(e);
				throw new RpcException(e);
			})
		);
	}

	@Patch()
	@ApiOperation({ summary: 'Update a team' })
	@ApiResponse({ status: 200, description: 'Team updated successfully.' })
	@ApiResponse({ status: 404, description: 'Team not found.' })
	update(@Body() updateTeamDto: UpdateTeamDto) {
		return this.client.send('teams.update', updateTeamDto).pipe(
			catchError((e) => {
				console.error(e);
				throw new RpcException(e);
			})
		);
	}
}
