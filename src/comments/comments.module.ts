import { Module } from '@nestjs/common';
import { NatsModule } from 'src/shared/transports';
import { CommentsController } from './comments.controller';

@Module({
	controllers: [CommentsController],
	imports: [NatsModule],
})
export class CommentsModule {}
