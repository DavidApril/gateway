import { Module } from '@nestjs/common';
import { NatsModule } from 'src/shared/transports';
import { TeamsController } from './teams.controller';

@Module({
	controllers: [TeamsController],
	imports: [NatsModule],
})
export class TeamsModule {}
