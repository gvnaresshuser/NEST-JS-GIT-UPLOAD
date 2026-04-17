//E:\MURALI\NEST-JS\nestjs-eslint\src\common\test-eslint-FINAL-FIXED-CODE.ts
//pnpm exec eslint src/common/test-eslint-FINAL-FIXED-CODE.ts
//pnpm exec eslint src/common/test-eslint-FINAL-FIXED-CODE.ts --fix

import { readFile as _readFile, writeFile as _writeFile } from 'fs';
/*
👉 This is technically correct (due to _ ignore rule)
But:
⚠️ Better approach:
Remove unused imports instead of renaming
✅ Cleaner Fix:
// remove if not used
*/

const age = 25;

//function test(a: unknown, b: number): boolean {
export async function test(a: unknown, b: number): Promise<boolean> {
  if (a === b) {
    console.warn('Equal');
  }

  if (age > 18) {
    console.warn('Adult');
  } else {
    console.warn('Minor');
  }

  // Properly handled promise
  try {
    await fetchData();
  } catch (err) {
    console.error(err);
  }
  //------------------------
  // Option 1: Recommended (clean async flow)
  //await fetchData();

  // Option 2: Fire-and-forget (handle manually)
  // fetchData().catch((err) => {
  //   console.error(err);
  // });
  //------------------------

  if (b > 10) {
    return true;
  }

  return false;
}

async function fetchData(): Promise<string> {
  return 'data';
}

throwError(); // only to test

//throw new Error('error');
//Option 1 (for testing only):
function throwError(): never {
  throw new Error('error');
}
//👉 We use never because:
//This function will NEVER return — it always throws an error and stops execution.

/*
🔹 What is Hoisting?

👉 During execution, JavaScript moves function declarations to the top of the scope.

So internally, it becomes like this:

function throwError(): never {
  throw new Error('error');
}

throwError();

✔ That’s why calling it before definition works.
*/
/*
USAGE OF NEVER IN NEST-JS:
-------------------------
✅ Correct Way in NestJS

Use built-in exceptions like:

import { BadRequestException } from '@nestjs/common';

throw new BadRequestException('Invalid input');
🔥 If you want formatted error response

NestJS automatically returns structured JSON:

{
  "statusCode": 400,
  "message": "Invalid input",
  "error": "Bad Request"
}
✅ Custom Formatted Error (Recommended)
import { BadRequestException } from '@nestjs/common';

throw new BadRequestException({
  message: 'Validation failed',
  details: 'Email is required',
});

👉 Response:

{
  "statusCode": 400,
  "message": {
    "message": "Validation failed",
    "details": "Email is required"
  },
  "error": "Bad Request"
}
🔥 Your throwError function (Improved for NestJS)

If you still want a reusable helper:

import { BadRequestException } from '@nestjs/common';

function throwError(message: string): never {
  throw new BadRequestException(message);
}

✔ Now it:

Uses NestJS exception system
Still correctly uses never
Gives proper API response
🚀 Even Better: Generic Error Helper
import { HttpException, HttpStatus } from '@nestjs/common';

function throwError(
  message: string,
  status: HttpStatus = HttpStatus.BAD_REQUEST,
): never {
  throw new HttpException({ message }, status);
}
🧠 Best Practice in NestJS

👉 Prefer:

Built-in exceptions (BadRequestException, NotFoundException, etc.)
Or global exception filters for formatting
🔥 Advanced (Production Level)

Use a global exception filter to standardize all responses:

{
  statusCode: 400,
  success: false,
  message: "Validation failed",
  data: null
}
🧾 Final Summary
| Approach                        | Recommended            |
| ------------------------------- | ---------------------- |
| `throw new Error()`             | ❌ No                   |
| `throwError(): never` (generic) | ⚠️ Limited             |
| NestJS exceptions               | ✅ Best                 |
| Custom exception helper         | ✅ Good                 |
| Global exception filter         | 🚀 Best for production |

*/
