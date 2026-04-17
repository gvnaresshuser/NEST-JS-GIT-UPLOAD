import * as jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'mysecret';

export const signToken = (payload: any) => {
  return jwt.sign(payload, SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET);
};
