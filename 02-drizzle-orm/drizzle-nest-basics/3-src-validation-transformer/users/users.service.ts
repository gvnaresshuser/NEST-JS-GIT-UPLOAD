/* import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {}
 */
//---------------------------------------------------
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getHelloUsers(): string {
    return 'Hello World! FROM USERS SERVICE';
  }
}
