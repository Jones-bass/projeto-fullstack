import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { hashSync as bcryptHashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly users: UserDto[] = [
    {
      id: '1',
      username: 'Jones',
      password: bcryptHashSync('123123', 10), 
    },
  ];

  async create(newUser: UserDto): Promise<void> {
    const { v4: uuidv4 } = await import('uuid');
    newUser.id = uuidv4();
    newUser.password = bcryptHashSync(newUser.password, 10); 
    this.users.push(newUser);
    console.log(this.users);
  }

  async findByUserName(username: string): Promise<UserDto | null> {
    const user = this.users.find((user) => user.username === username);
    return user ?? null;  
  }
}
