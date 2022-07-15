import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
// import { Secret } from 'jsonwebtoken';

dotenv.config();

export default class Token {
  private _jwtConfig: jwt.SignOptions;

  constructor() {
    this._jwtConfig = {
      expiresIn: '1d',
    };
  }

  public generate(userId: number, role: string): string {
    return jwt.sign(
      { data: { userId, role } },
      (process.env.JWT_SECRET as string),
      this._jwtConfig,
    );
  }
}