import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { Token, User } from './decorators';
import { LoginUserDto, RegisterUserDto } from './dto';
import { Auth } from 'src/shared/decorators';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

	@Post('register')
	@ApiOperation({ summary: 'Register a new user' })
	@ApiResponse({ status: 201, description: 'User registered' })
	@ApiResponse({ status: 400, description: 'Bad Request' })
	register(@Body() registerUserDto: RegisterUserDto) {
		return this.client.send('auth.register.user', registerUserDto).pipe(
			catchError((e) => {
				throw new RpcException(e);
			})
		);
	}

	@Post('login')
	@ApiOperation({ summary: 'Login a user' })
	@ApiResponse({ status: 200, description: 'User logged in' })
	@ApiResponse({ status: 401, description: 'Unauthorized' })
	login(@Body() loginUserDto: LoginUserDto) {
		return this.client.send('auth.login.user', loginUserDto).pipe(
			catchError((e) => {
				throw new RpcException(e);
			})
		);
	}

	@Get('verify')
	@ApiOperation({ summary: 'Verify user token' })
	@ApiResponse({ status: 200, description: 'Token is valid' })
	@ApiResponse({ status: 401, description: 'Unauthorized' })
	@Auth()
	verifyToken(@User() user: any, @Token() token: string) {
		return { user, token };
	}

	@Get('seed')
	@ApiOperation({ summary: 'Seed database' })
	@ApiResponse({ status: 200, description: 'Database seeded' })
	@ApiResponse({ status: 500, description: 'Internal Server Error' })
	seed() {
		return this.client.send('seed.execute', {}).pipe(
			catchError((e) => {
				throw new RpcException(e);
			})
		);
	}
}
