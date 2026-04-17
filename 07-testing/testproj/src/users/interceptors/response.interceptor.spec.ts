import { ResponseInterceptor } from './response.interceptor';
import { of } from 'rxjs';

describe('ResponseInterceptor - Step 1', () => {
  let interceptor: ResponseInterceptor;

  beforeEach(() => {
    interceptor = new ResponseInterceptor();
  });
  /*
  👉 Key concept:
Uses RxJS Observable
Transforms response

next.handle()
👉 returns Observable
🔥 RxJS Flow
of(data) → pipe → map → transformed data
🔥 Why done()?
👉 Because Observable is async
  */
  //🧪 STEP 1 — Should wrap response ✅
  it('should wrap response in standard format', (done) => {
    const mockData = { message: 'Hello' };

    const mockContext: any = {};

    const mockNext: any = {
      handle: () => of(mockData), // 👈 Observable
    };

    interceptor.intercept(mockContext, mockNext).subscribe((result) => {
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockData);
      expect(result.timestamp).toBeDefined();
      expect(result.executionTime).toContain('ms');

      done(); // ✅ important for async observable
    });
  });
  //🚀 INTERCEPTOR STEP 2 — Validate Structure Strictly
  /*
  🧠 Goal

Instead of just checking values exist, we:

Validate response structure
Validate types
Avoid flaky tests (time-based)
--------------------------------------
🔥 Why not check exact values?
❌ Bad:
expect(result.executionTime).toBe('5ms');
👉 This may fail randomly
✅ Good:
expect(result.executionTime).toMatch(/^\d+ms$/);
👉 Flexible + reliable
🧠 Explain This
🔹 toMatchObject
expect(result).toMatchObject({
  success: true,
  data: mockData,
});
👉 Partial matching (very useful in APIs)
🧠 Regex Teaching Moment
/^\d+ms$/
👉 Means:
number + "ms"
e.g., 10ms, 3ms
//🧪 TEST — Strict Validation ✅
  */
  it('should return properly structured response object', (done) => {
    const mockData = { message: 'Hello' };

    const mockContext: any = {};

    const mockNext: any = {
      handle: () => of(mockData),
    };

    interceptor.intercept(mockContext, mockNext).subscribe((result) => {
      // ✅ Check full structure
      expect(result).toMatchObject({
        success: true,
        data: mockData,
      });

      // ✅ Check timestamp format
      expect(typeof result.timestamp).toBe('string');

      // ✅ Check executionTime format (e.g., "5ms")
      expect(result.executionTime).toMatch(/^\d+ms$/);

      done();
    });
  });
});
//TEST-RESULT
/*
E:\MURALI\NEST-JS\testproj\src\users\interceptors\response.interceptor.spec.ts

pnpm exec jest src/users/interceptors/response.interceptor.spec.ts

E:\MURALI\NEST-JS\testproj>pnpm exec jest src/users/interceptors/response.interceptor.spec.ts
 PASS  src/users/interceptors/response.interceptor.spec.ts
  ResponseInterceptor - Step 1
    √ should wrap response in standard format (10 ms)
    √ should return properly structured response object (1 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        1.203 s
Ran all test suites matching src/users/interceptors/response.interceptor.spec.ts.

E:\MURALI\NEST-JS\testproj>
*/
/*
🏆 YOU HAVE COMPLETED INTERCEPTOR TESTING 🎉
| Concept              | Covered |
| -------------------- | ------- |
| Observable           | ✅       |
| map()                | ✅       |
| Async testing        | ✅       |
| Structure validation | ✅       |

*/