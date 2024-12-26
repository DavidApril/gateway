import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { catchError } from 'rxjs';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateCommentDto } from './dto/create-comment.dto';
import { NATS_SERVICE } from 'src/config';
import { CommentsPaginationDto } from './dto';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
	constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

	@Post('create')
	@ApiOperation({ summary: 'Create a new comment' })
	@ApiResponse({ status: 201, description: 'Comment created successfully' })
	@ApiResponse({ status: 400, description: 'Bad Request' })
	createProject(@Body() createCommentDto: CreateCommentDto) {
		return this.client.send('comments.create', createCommentDto).pipe(
			catchError((e) => {
				throw new RpcException(e);
			})
		);
	}

	@Get()
	@ApiOperation({ summary: 'Retrieve all comments based on pagination' })
	@ApiResponse({ status: 200, description: 'Comments retrieved successfully' })
	@ApiResponse({ status: 400, description: 'Bad Request' })
	findAllPerId(@Query() commentsPaginationDto: CommentsPaginationDto) {
		return this.client.send('comments.find.all', commentsPaginationDto).pipe(
			catchError((e) => {
				console.error(e);
				throw new RpcException(e);
			})
		);
	}
}
