import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';

import { AuthenticationGuard } from 'src/modules/auth/guard/auth.guard';
import { NotificationService } from './notification.service';

@ApiTags('Notification')
@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Get()
  async getNotifications(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit = 20,
    @Request() request
  ) {
    return this.notificationService.getNotifications(request.user.id, {
      page,
      limit
    });
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Get('/new')
  async getNewNotifications(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit = 5,
    @Request() request
  ) {
    return this.notificationService.getNewNotifications(request.user.id, {
      page,
      limit
    });
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Patch('/:id')
  async updateNotification(@Param('id') id: string) {
    return this.notificationService.updateNotification(id);
  }
}
