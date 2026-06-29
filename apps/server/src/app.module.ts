import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminAuthModule } from './modules/admin-auth/admin-auth.module';
import { DashboardModule } from './modules/admin-dashboard/dashboard.module';
import { AdminUsersModule } from './modules/admin-users/admin-users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './modules/common/common.module';
import { MedalsModule } from './modules/medals/medals.module';
import { StairModule } from './modules/stair/stair.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI') ?? 'mongodb://127.0.0.1:27017/goSpace',
      }),
    }),
    AuthModule,
    AdminAuthModule,
    DashboardModule,
    AdminUsersModule,
    CommonModule,
    UsersModule,
    MedalsModule,
    StairModule,
  ],
})
export class AppModule {}