import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { NatsModule } from 'src/shared/transports';

@Module({
  controllers: [RoleController],
  imports: [NatsModule],
})
export class RoleModule {}
