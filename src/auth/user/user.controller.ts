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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() registerUserDto: RegisterUserDto) {
    return this.client.send('user.create', registerUserDto).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
  }

  @Get('find_all')
  @ApiOperation({ summary: 'Retrieve all users with pagination' })
  @ApiResponse({ status: 200, description: 'List of users retrieved successfully' })
  findAll(@Query() userPaginationDto: UserPaginationDto) {
    return this.client.send('user.find.all', userPaginationDto).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
  }

  @Get(':term')
  @ApiOperation({ summary: 'Find one user by term' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('term') term: string) {
    return this.client.send('user.find.one', term).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
  }

  @Patch()
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.client.send('user.update', updateUserDto).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('user.delete', id).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
  }
}
