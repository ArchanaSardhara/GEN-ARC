import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthController,],
  providers:[HealthService],
  exports: [HealthService],
})
export class HealthModule {}
