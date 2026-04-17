import { HttpExceptionFilter } from './http-exception.filter';
import { HttpException } from '@nestjs/common';

describe('HttpExceptionFilter - Step 1', () => {
  let filter: HttpExceptionFilter;

  beforeEach(() => {
    filter = new HttpExceptionFilter();
  });
  //🧪 STEP 1 — Should format error response ✅
  /*
  🧠 Teaching Insight
  🔥 What is ArgumentsHost?
  host.switchToHttp()
  👉 Gives access to:
  request
  response
  🔥 Why we mock response like this?
  status: jest.fn().mockReturnThis()
  👉 Because Express uses:
  res.status().json()
  👉 chaining must be supported
  */
  it('should format HttpException correctly', () => {
    const exception = new HttpException('Test error', 400);

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockRequest = {
      url: '/users/1',
    };

    const mockHost: any = {
      switchToHttp: () => ({
        getResponse: () => mockResponse,
        getRequest: () => mockRequest,
      }),
    };

    filter.catch(exception, mockHost);

    expect(mockResponse.status).toHaveBeenCalledWith(400);

    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: 'Test error',
        path: '/users/1',
      }),
    );
  });
  //===================================================================
  //🚀 FILTER STEP 2 — Object Response Case
  /*
    We’ll test:
  ✅ Object-based exception response
  👉 { message: [...] } case
  👉 very common in validation errors 🚀
  */
  it('should handle object-based exception response', () => {
    const exception = new HttpException(
      { message: ['Validation failed'] },
      400,
    );

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockRequest = {
      url: '/users',
    };

    const mockHost: any = {
      switchToHttp: () => ({
        getResponse: () => mockResponse,
        getRequest: () => mockRequest,
      }),
    };

    filter.catch(exception, mockHost);

    expect(mockResponse.status).toHaveBeenCalledWith(400);

    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: ['Validation failed'], // 🔥 important
        path: '/users',
      }),
    );
  });
  //---------------------------------------------------------------------
  /*
  📌 Scenario
  Sometimes Nest throws errors like:
  throw new BadRequestException({
    message: ['email is required'],
  });
  👉 In your filter:
  const exceptionResponse = exception.getResponse();
  const message =
    typeof exceptionResponse === 'string'
      ? exceptionResponse
      : exceptionResponse.message;
  */
  //===================================================================
  //===================================================================
  //===================================================================
});

//TEST-RESULT
/*
E:\MURALI\NEST-JS\testproj\src\users\filters\http-exception\http-exception.filter.spec.ts

pnpm exec jest src/users/filters/http-exception/http-exception.filter.spec.ts


E:\MURALI\NEST-JS\testproj>pnpm exec jest src/users/filters/http-exception/http-exception.filter.spec.ts
  console.log
    --------------------------------------

      at HttpExceptionFilter.catch (users/filters/http-exception/http-exception.filter.ts:13:13)

  console.log
    🔥 Exception Filter Triggered

      at HttpExceptionFilter.catch (users/filters/http-exception/http-exception.filter.ts:14:13)

  console.log
    --------------------------------------

      at HttpExceptionFilter.catch (users/filters/http-exception/http-exception.filter.ts:15:13)

  console.log
    --------------------------------------

      at HttpExceptionFilter.catch (users/filters/http-exception/http-exception.filter.ts:13:13)

  console.log
    🔥 Exception Filter Triggered

      at HttpExceptionFilter.catch (users/filters/http-exception/http-exception.filter.ts:14:13)

  console.log
    --------------------------------------

      at HttpExceptionFilter.catch (users/filters/http-exception/http-exception.filter.ts:15:13)

 PASS  src/users/filters/http-exception/http-exception.filter.spec.ts
  HttpExceptionFilter - Step 1
    √ should format HttpException correctly (37 ms)
    √ should handle object-based exception response (10 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        1.182 s, estimated 5 s
Ran all test suites matching src/users/filters/http-exception/http-exception.filter.spec.ts.

E:\MURALI\NEST-JS\testproj>
*/
/*
🏆 YOU HAVE COMPLETED FILTER TESTING 🎉
| Case                | Covered |
| ------------------- | ------- |
| String error        | ✅       |
| Object error        | ✅       |
| Response formatting | ✅       |

*/
//----------------------------------------------------------------
/* import { HttpExceptionFilter } from './http-exception.filter';

describe('HttpExceptionFilter', () => {
  it('should be defined', () => {
    expect(new HttpExceptionFilter()).toBeDefined();
  });
});
 */