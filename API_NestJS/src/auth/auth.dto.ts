export class AuthResponseDto {
  token: string;
  expiresIn: number;
}



export class LoginDto {
  username: string;
  password: string;
}
