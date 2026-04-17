import { ParseIntCustomPipe } from './parse-int-custom.pipe';
import { BadRequestException } from '@nestjs/common';

describe('ParseIntCustomPipe - Step 1', () => {
  let pipe: ParseIntCustomPipe;

  beforeEach(() => {
    pipe = new ParseIntCustomPipe();
  });
  //===================================================================
  //🧪 TEST 1 — Valid Number ✅
  /*
  🧠 Teaching Insight
  🔥 Real Request
  GET /users/10
  👉 Param comes as:
  "10" (string)
  👉 Pipe converts:
  10 (number)
  */
  it('should transform string to number', () => {
    const result = pipe.transform('10', {} as any);

    expect(result).toBe(10);
  });
  //===================================================================
  /*
  //🚀 PIPE STEP 2 — Invalid Input ❌
  We’ll test:

❌ Invalid input (abc)
👉 should throw BadRequestException 🚀
  */
  it('should throw BadRequestException for invalid number', () => {
    expect(() => pipe.transform('abc', {} as any)).toThrow(
      BadRequestException,
    );
  });
  //===================================================================
  //===================================================================
  //===================================================================
  //===================================================================
  //===================================================================
});

//----------------------------------------------------------------------
//TEST-RESULT
/*
//E:\MURALI\NEST-JS\testproj\src\users\pipes\parse-int-custom\parse-int-custom.pipe.spec.ts

pnpm exec jest src/users/pipes/parse-int-custom/parse-int-custom.pipe.spec.ts


E:\MURALI\NEST-JS\testproj>pnpm exec jest src/users/pipes/parse-int-custom/parse-int-custom.pipe.spec.ts
 PASS  src/users/pipes/parse-int-custom/parse-int-custom.pipe.spec.ts
  ParseIntCustomPipe - Step 1
    √ should transform string to number (4 ms)
    √ should throw BadRequestException for invalid number (10 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        1.165 s
Ran all test suites matching src/users/pipes/parse-int-custom/parse-int-custom.pipe.spec.ts.

E:\MURALI\NEST-JS\testproj>
*/
//-----------------------------------------------------------------
/*
🏆 YOU HAVE COMPLETED PIPE TESTING 🎉
| Case          | Covered |
| ------------- | ------- |
| Valid input   | ✅       |
| Invalid input | ✅       |

*/
//----------------------------------------------------------
/* import { ParseIntCustomPipe } from './parse-int-custom.pipe';

describe('ParseIntCustomPipe', () => {
  it('should be defined', () => {
    expect(new ParseIntCustomPipe()).toBeDefined();
  });
});
 */