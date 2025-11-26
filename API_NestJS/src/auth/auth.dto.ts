export class AuthResponseDto {
  message: string;  // Adicionando a propriedade 'message'
  user: {
    username: string;
    id: string;
  };
  token: string;
  expiresIn: number;
}


export class LoginDto {
  username: string;
  password: string;
}


