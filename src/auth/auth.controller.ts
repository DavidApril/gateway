import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { Token, User } from './decorators';
import { LoginUserDto, RegisterUserDto } from './dto';
import { Auth } from 'src/shared/decorators';

@Controller('auth')
export class AuthController {
	constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

	@Post('register')
	register(@Body() registerUserDto: RegisterUserDto) {
		return this.client.send('auth.register.user', registerUserDto).pipe(
			catchError((e) => {
				throw new RpcException(e);
			})
		);
	}

	@Post('login')
	login(@Body() loginUserDto: LoginUserDto) {
		return this.client.send('auth.login.user', loginUserDto).pipe(
			catchError((e) => {
				throw new RpcException(e);
			})
		);
	}

	@Get('verify')
	@Auth()
	verifyToken(@User() user: any, @Token() token: string) {
		return { user, token };
	}

	@Get('seed')
	seed() {
		return this.client.send('seed.execute', {}).pipe(
			catchError((e) => {
				throw new RpcException(e);
			})
		);
	}
}
