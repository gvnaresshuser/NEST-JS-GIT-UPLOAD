import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test1')
  getHello1(): string {
    return this.appService.getHello();
  }

  @Get()
  getHello(): string {
    const message = 'Hello';

    const a: any = 5;
    const b = '5';

    if (a === b) {
      console.warn('Strict equality');
    } else {
      console.warn('Strict inequality');
    }

    return message + this.appService.getHello();
  }
}
//http://localhost:3000/ - endpoints
//Command to Show Errors Only
//pnpm exec eslint src/app.controller.ts --fix
