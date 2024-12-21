import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
@Injectable()
export class AuthGuard implements CanActivate {
	constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(request);
		if (!token) throw new UnauthorizedException('No token provided');

		try {
			const { user, token: newToken } = await firstValueFrom(this.client.send('auth.verify.token', token));

			request['user'] = user;
			request['token'] = newToken;
		} catch (error) {
			throw new UnauthorizedException('Invalid token');
		}

		return true;
	}

	private extractTokenFromHeader(request: any): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}
}
