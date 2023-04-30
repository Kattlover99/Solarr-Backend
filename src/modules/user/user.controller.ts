import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  Response,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

import { AuthenticationGuard } from 'src/modules/auth/guard/auth.guard';
import { GenerateNonceDto } from './dto/generateNonce.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { VerifySignatureDto } from './dto/verifySignature.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/generate-nonce')
  async generateNonce(@Body() generateNonceDto: GenerateNonceDto) {
    return this.userService.generateNonce(generateNonceDto);
  }

  @Post('/verify-signature')
  async verifySignature(@Body() verifySignatureDto: VerifySignatureDto) {
    return this.userService.verifySignature(verifySignatureDto);
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Get('/me')
  async getMe(@Request() request) {
    return this.userService.getMe(request.user);
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Get('user/:id')
  async getUser(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Get('address/:walletAddress')
  async getUserByAddress(@Param('walletAddress') walletAddress: string) {
    return this.userService.getUserByAddress(walletAddress);
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Patch()
  async updateUser(@Request() request, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(request.user.id, updateUserDto);
  }

  @UseGuards(AuthenticationGuard)
  @ApiBearerAuth()
  @Post('/upload/avatar')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(@UploadedFile('file') file, @Request() request) {
    return this.userService.uploadAvatar(request.user.id, file);
  }
}
