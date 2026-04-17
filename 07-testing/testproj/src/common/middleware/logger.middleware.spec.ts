import { LoggerMiddleware } from './logger.middleware';

describe('LoggerMiddleware - Step 1', () => {
    let middleware: LoggerMiddleware;

    beforeEach(() => {
        middleware = new LoggerMiddleware();
    });
    //===================================================================
    //🧪 STEP 1 — Should call next() ✅
    /*
    Middleware flow
    next() importance
    */
    it('should call next()', () => {
        const mockReq: any = {
            method: 'GET',
            originalUrl: '/users',
        };

        const mockRes: any = {
            on: jest.fn(),
        };

        const next = jest.fn();

        middleware.use(mockReq, mockRes, next);

        expect(next).toHaveBeenCalled();
    });
    //===================================================================
    //🚀 STEP 2 — Should register finish event
    /*
    🧠 Teaching Insight
    res.on('finish', callback)
    👉 Runs AFTER response is sent
    --------------------------------------
    🧠 Teaching Gold Point
    🔥 Why capture callback?
    res.on('finish', callback)
    👉 We simulate:
    finishCallback();
    🔥 Why mock console?
    jest.spyOn(console, 'log')
    👉 To verify logging
    */
    it('should register finish event on response', () => {
        const mockReq: any = {
            method: 'GET',
            originalUrl: '/users',
        };

        const mockRes: any = {
            on: jest.fn(),
        };

        const next = jest.fn();

        middleware.use(mockReq, mockRes, next);

        expect(mockRes.on).toHaveBeenCalledWith(
            'finish',
            expect.any(Function),
        );
    });
    //===================================================================
});

//TEST-RESULT
/*
E:\MURALI\NEST-JS\testproj\src\common\middleware\logger.middleware.spec.ts

pnpm exec jest src/common/middleware/logger.middleware.spec.ts


E:\MURALI\NEST-JS\testproj>pnpm exec jest src/common/middleware/logger.middleware.spec.ts
 PASS  src/common/middleware/logger.middleware.spec.ts
  LoggerMiddleware - Step 1
    √ should call next() (4 ms)
    √ should register finish event on response (2 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        1.134 s
Ran all test suites matching src/common/middleware/logger.middleware.spec.ts.

E:\MURALI\NEST-JS\testproj>
*/
/*
🏆 FINAL RESULT
| Test                    | Purpose |
| ----------------------- | ------- |
| next() called           | ✅       |
| finish event registered | ✅       |
| logging works           | 🔥      |


*/