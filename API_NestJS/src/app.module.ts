import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ClimateModule } from './climate/climate.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    UsersModule, 
    AuthModule, 
    ClimateModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
