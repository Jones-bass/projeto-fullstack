import { Controller, Get, UseGuards } from '@nestjs/common';
import { ClimateService } from './climate.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('climate')
export class ClimateController {
  constructor(private readonly climateService: ClimateService) {}

  @Get()
  async getClimateData() {
    const data = await this.climateService.getClimateData('New York'); 
    return data;
  }
}

