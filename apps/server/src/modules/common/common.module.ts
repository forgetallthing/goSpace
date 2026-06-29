import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { AdminKeyGuard } from './admin-key.guard';

@Module({
  controllers: [HealthController],
  providers: [AdminKeyGuard],
  exports: [AdminKeyGuard],
})
export class CommonModule {}