import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { success } from '../../common/api-response';
import { CurrentUser, JwtUserPayload } from '../../common/current-user';
import { AdminJwtGuard } from '../admin-auth/admin-jwt.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateMedalConfigDto } from './dto/create-medal-config.dto';
import { QueryMedalsDto } from './dto/query-medals.dto';
import { QueryMedalAdminDto } from './dto/query-medal-admin.dto';
import { UpdateMedalConfigDto } from './dto/update-medal-config.dto';
import { MedalsService } from './medals.service';

@Controller('medals')
@UseGuards(JwtAuthGuard)
export class MedalsController {
  constructor(private readonly medalsService: MedalsService) {}

  @Get()
  async list(@Query() query: QueryMedalsDto) {
    return success(await this.medalsService.list(query.status));
  }

  @Get(':medalId')
  async detail(@Param('medalId') medalId: string, @CurrentUser() user: JwtUserPayload): Promise<ReturnType<typeof success>> {
    return success(await this.medalsService.getDetail(medalId, user.sub));
  }
}

@Controller('admin/medals')
@UseGuards(AdminJwtGuard)
export class AdminMedalsController {
  constructor(private readonly medalsService: MedalsService) {}

  @Get()
  async list(@Query() query: QueryMedalAdminDto) {
    return success(await this.medalsService.listAdmin(query));
  }

  @Post()
  async create(@Body() dto: CreateMedalConfigDto) {
    return success(await this.medalsService.createConfig(dto));
  }

  @Get(':medalId')
  async detail(@Param('medalId') medalId: string) {
    return success(await this.medalsService.getDetail(medalId));
  }

  @Patch(':medalId')
  async update(@Param('medalId') medalId: string, @Body() dto: UpdateMedalConfigDto) {
    return success(await this.medalsService.updateConfig(medalId, dto));
  }

  @Delete(':medalId')
  async remove(@Param('medalId') medalId: string) {
    return success(await this.medalsService.deleteConfig(medalId));
  }
}