import { Module } from '@nestjs/common';
import { NatsModule } from 'src/shared/transports';
import { PermissionController } from './permission.controller';

@Module({
	controllers: [PermissionController],
	imports: [NatsModule],
})
export class PermissionModule {}
