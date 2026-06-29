import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CurrentUser, JwtUserPayload } from '../../common/current-user';
import { success } from '../../common/api-response';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateStairRecordDto } from './dto/create-stair-record.dto';
import { StairService } from './stair.service';

@Controller('stair')
@UseGuards(JwtAuthGuard)
export class StairController {
  constructor(private readonly stairService: StairService) {}

  @Get('home')
  async home(@CurrentUser() user: JwtUserPayload) {
    return success(await this.stairService.home(user.sub));
  }

  @Post('records')
  async createRecord(@CurrentUser() user: JwtUserPayload, @Body() dto: CreateStairRecordDto) {
    return success(await this.stairService.createRecord(user.sub, dto));
  }

  @Get('records')
  async listRecords(@CurrentUser() user: JwtUserPayload, @Query('page') page = '1', @Query('pageSize') pageSize = '20') {
    return success(await this.stairService.listRecords(user.sub, Number(page), Number(pageSize)));
  }
}