import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { META_ROLES } from '../decorators';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Role } from '../interfaces';

@Injectable()
export class UserRoleGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const validRoles: Role[] = this.reflector.get(META_ROLES, ctx.getHandler());

		if (!validRoles) return true;
		if (validRoles.length === 0) return true;

		const request = ctx.switchToHttp().getRequest();
		const user = request.user;

		if (!user) throw new BadRequestException('User not found');

		for (const role of user.roles) {
			if (validRoles.includes(role)) return true;
		}

		throw new UnauthorizedException(`User ${user.name} does not have the required roles: [${validRoles}]`);
	}
}
