//E:\MURALI\NEST-JS\nestjs-eslint\src\common\test-eslint-FIXED-CODE.ts
//pnpm exec eslint src/common/test-eslint-FIXED-CODE.ts
//pnpm exec eslint src/common/test-eslint-FIXED-CODE.ts --fix

import { readFile } from 'fs';
import { writeFile } from 'fs'; // duplicate import

const age = 25;

function test(a: any, b: number) {
  if (a == b) {
    console.log('Equal');
  }

  if (age > 18) {
    console.log('Adult');
  } else {
    console.log('Minor');
  }

  fetchData(); // floating promise

  if (b > 10) {
    return true;
  }
}

async function fetchData() {
  return 'data';
}

throw 'error';
