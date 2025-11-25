import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponseDto, LoginDto } from './auth.dto';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    const { username, password } = loginDto;
    return this.authService.signIn(username, password);
  }
}
