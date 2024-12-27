import { Body, Controller, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { catchError } from 'rxjs';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { AssociateToProjectDto, AssociateUserDto, CreateTeamDto, TeamPaginationDto, UpdateTeamDto } from './dto';
import { NATS_SERVICE } from 'src/config';
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
	@ApiOperation({ summary: 'Find teams' })
	@ApiResponse({ status: 200, description: 'Team found.' })
	@ApiResponse({ status: 404, description: 'Team not found.' })
	findOne(@Query() teamsPaginationDto: TeamPaginationDto) {
		return this.client.send('teams.find', teamsPaginationDto).pipe(
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

	@Post('/associate_project')
	@ApiOperation({ summary: 'Associate a team to a project' })
	@ApiResponse({ status: 201, description: 'Association successful.' })
	@ApiResponse({ status: 400, description: 'Bad request.' })
	associateToProject(@Body() associateToProjectDto: AssociateToProjectDto) {
		return this.client.send('teams.associate.project', associateToProjectDto).pipe(
			catchError((e) => {
				console.error(e);
				throw new RpcException(e);
			})
		);
	}

	@Post('/associate_user')
	associateUser(@Body() associateUser: AssociateUserDto) {
		return this.client.send('teams.associate.user', associateUser).pipe(
			catchError((e) => {
				console.error(e);
				throw new RpcException(e);
			})
		);
	}
}
