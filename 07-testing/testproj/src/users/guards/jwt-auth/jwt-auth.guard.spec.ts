import { JwtAuthGuard } from './jwt-auth.guard';
import { verifyToken } from '../../../common/utils/jwt.util';
import { UnauthorizedException } from '@nestjs/common';

jest.mock('../../../common/utils/jwt.util', () => ({
  verifyToken: jest.fn(),
}));
describe('JwtAuthGuard - Step 1', () => {
  let guard: JwtAuthGuard;

  beforeEach(() => {
    guard = new JwtAuthGuard();
  });
  //===================================================================
  //🧪 STEP 1 — Success Case ✅
  /*
  🔥 What is happening?
Authorization: Bearer token

👉 Guard:

Extracts token
Verifies token
Attaches user to request
  */
  it('should allow request with valid token', () => {
    const mockUser = { id: 1, name: 'John' };

    // ✅ Mock JWT
    (verifyToken as jest.Mock).mockReturnValue(mockUser);

    const mockRequest: any = {
      headers: {
        authorization: 'Bearer valid_token',
      },
    };

    const mockContext: any = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    };

    const result = guard.canActivate(mockContext);

    expect(result).toBe(true);

    // 🔥 VERY IMPORTANT
    expect(mockRequest.user).toEqual(mockUser);
  });
  //===================================================================
  //🧪 TEST — No Token Provided ❌
  /*
  We’ll test:
❌ No token provided
👉 throws UnauthorizedException 🚀
  */
  it('should throw UnauthorizedException if no token provided', () => {
    const mockRequest: any = {
      headers: {}, // ❌ no authorization header
    };

    const mockContext: any = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    };

    expect(() => guard.canActivate(mockContext)).toThrow(
      UnauthorizedException,
    );
  });
  //===================================================================
  //🧪 TEST — Invalid Token ❌
  /*
  We’ll test:
❌ Invalid token
👉 verifyToken throws error
👉 guard should catch and throw UnauthorizedException 🚀
  */
  it('should throw UnauthorizedException if token is invalid', () => {
    // ❌ Make verifyToken throw error
    (verifyToken as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    const mockRequest: any = {
      headers: {
        authorization: 'Bearer invalid_token',
      },
    };

    const mockContext: any = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    };

    expect(() => guard.canActivate(mockContext)).toThrow(
      UnauthorizedException,
    );
  });
  //===================================================================
  //===================================================================
  //===================================================================
  //===================================================================
});

//----------------------------------------------------------------------
//TEST-RESULT
/*
pnpm exec jest src/users/guards/jwt-auth/jwt-auth.guard.spec.ts


E:\MURALI\NEST-JS\testproj>pnpm exec jest src/users/guards\jwt-auth/jwt-auth.guard.spec.ts
  console.log
    Incoming Request Headers: { authorization: 'Bearer valid_token' }

      at JwtAuthGuard.canActivate (users/guards/jwt-auth/jwt-auth.guard.ts:14:13)

  console.log
    Extracted Token: valid_token

      at JwtAuthGuard.canActivate (users/guards/jwt-auth/jwt-auth.guard.ts:23:13)

  console.log
    Decoded Token: { id: 1, name: 'John' }

      at JwtAuthGuard.canActivate (users/guards/jwt-auth/jwt-auth.guard.ts:27:15)

  console.log
    Incoming Request Headers: {}

      at JwtAuthGuard.canActivate (users/guards/jwt-auth/jwt-auth.guard.ts:14:13)

 PASS  src/users/guards/jwt-auth/jwt-auth.guard.spec.ts
  JwtAuthGuard - Step 1
    √ should allow request with valid token (37 ms)
    √ should throw UnauthorizedException if no token provided (13 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        1.236 s
Ran all test suites matching src/users/guards\jwt-auth/jwt-auth.guard.spec.ts.

E:\MURALI\NEST-JS\testproj>
*/
//-----------------------------------------------------------------
/* import { JwtAuthGuard } from './jwt-auth.guard';

describe('JwtAuthGuard', () => {
  it('should be defined', () => {
    expect(new JwtAuthGuard()).toBeDefined();
  });
}); */
