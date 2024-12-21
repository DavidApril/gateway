import { Module } from '@nestjs/common';
import { NatsModule } from 'src/shared/transports';
import { AuthController } from './auth.controller';

@Module({
	controllers: [AuthController],
	imports: [NatsModule],
})
export class AuthModule {}
