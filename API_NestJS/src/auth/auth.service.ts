import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { AuthResponseDto } from './auth.dto';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds: number;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    const expirationTime = this.configService.get<number>('JWT_EXPIRATION_TIME');
    this.jwtExpirationTimeInSeconds = expirationTime !== undefined ? expirationTime : 3600; // Valor padrão 3600
  }

  async signIn(username: string, password: string): Promise<AuthResponseDto> {
    const foundUser = await this.usersService.findByUserName(username);
    if (!foundUser) {
      console.log('Usuário não encontrado');
      throw new UnauthorizedException('Invalid credentials');
    }

    // Log de senha para depuração
    console.log('Senha fornecida:', password);
    console.log('Senha armazenada (hash):', foundUser.password);

    const isPasswordValid = bcryptCompareSync(password, foundUser.password);
    console.log('Senha válida?', isPasswordValid);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: foundUser.id, username: foundUser.username };

    const token = this.jwtService.sign(payload, {
      expiresIn: this.jwtExpirationTimeInSeconds,
    });
    return { token, expiresIn: this.jwtExpirationTimeInSeconds };
  }


}

