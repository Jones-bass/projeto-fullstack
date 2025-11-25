import { Module } from '@nestjs/common';
import { ClimateService } from './climate.service';
import { ClimateController } from './climate.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ClimateController],
  providers: [ClimateService],
})
export class ClimateModule {}


