import { Controller, Get, Query } from '@nestjs/common';
import { FilterPipe } from './pipes/filter.pipe';
@Controller('servers')
export class ServersController {
    private servers = [
        {
            instanceType: 'medium',
            name: 'Beta Server',
            status: 'stable',
        },
        {
            instanceType: 'medium',
            name: 'Alpha Server',
            status: 'critical',
        },
        {
            instanceType: 'large',
            name: 'User Database',
            status: 'stable',
        },
        {
            instanceType: 'small',
            name: 'Development Server',
            status: 'offline',
        },
    ];

    @Get()
    getServers(@Query(FilterPipe) query: any) {
        return FilterPipe.applyFilter(this.servers, query);
    }
}
/*
🌐 Testing URLs (VERY IMPORTANT)
✅ 1. Get all servers
GET http://localhost:3000/servers
✅ 2. Filter by status
GET http://localhost:3000/servers?status=stable

👉 Output:

[
  {
    "instanceType": "hello",
    "name": "Beta Server",
    "status": "stable"
  },
  {
    "instanceType": "large",
    "name": "User Database",
    "status": "stable"
  }
]
✅ 3. Filter by instanceType
GET http://localhost:3000/servers?instanceType=small
✅ 4. Multiple filters (🔥 powerful)
GET http://localhost:3000/servers?status=stable&instanceType=large
*/
/*
NOTES:
-----
🚀 NestJS CLI Commands
✅ 1. Generate module
nest g module servers
✅ 2. Generate controller
nest g controller servers

👉 This will auto-register controller inside module 👍

⚡ Optional (Recommended) → Service
nest g service servers
📁 Final Structure
src/
 └── servers/
      ├── servers.module.ts
      ├── servers.controller.ts
      └── servers.service.ts   (optional but good practice)
*/
/*
E:\MURALI\NEST-JS\drizzle-nest-basics>nest g module servers
CREATE src/servers/servers.module.ts (88 bytes)
UPDATE src/app.module.ts (395 bytes)

E:\MURALI\NEST-JS\drizzle-nest-basics>nest g controller servers
CREATE src/servers/servers.controller.ts (107 bytes)
CREATE src/servers/servers.controller.spec.ts (517 bytes)
UPDATE src/servers/servers.module.ts (182 bytes)

E:\MURALI\NEST-JS\drizzle-nest-basics>
*/
