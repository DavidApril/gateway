import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserController } from './user/user.controller';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { NatsModule } from 'src/shared/transports';

@Module({
	controllers: [AuthController, UserController],
	imports: [NatsModule, RoleModule, PermissionModule],
})
export class AuthModule {}
