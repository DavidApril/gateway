import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { RegisterUserDto } from '../dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPaginationDto } from './dto/user-pagination.dto';

@Controller('user')
export class UserController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  create(@Body() registerUserDto: RegisterUserDto) {
    return this.client.send('user.create', registerUserDto).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
  }

  @Get('find_all')
  findAll(@Query() userPaginationDto: UserPaginationDto) {
    return this.client.send('user.find.all', userPaginationDto).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.client.send('user.find.one', term).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
  }

  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.client.send('user.update', updateUserDto).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('user.delete', id).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
  }
}
