import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/shared/dto';
import { NATS_SERVICE } from 'src/config';
import { CreatePermissionDto } from './dto/create-permission.dto';

@Controller('permission')
export class PermissionController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('create')
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.client.send('permission.create', createPermissionDto).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.client.send('permission.find.one', term).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.client.send('permission.find.all', paginationDto).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
  }

  @Delete(':term')
  delete(@Param('term') term: string) {
    return this.client.send('permission.delete.one', term).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
  }

  @Delete()
  deleteAll() {
    return this.client.send('permission.delete.all', {}).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
  }
}
