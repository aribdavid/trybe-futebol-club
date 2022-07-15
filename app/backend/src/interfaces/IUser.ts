import { Request } from 'express';
import User from '../database/models/UserModel';
import { TokenPayload } from '../types/TokenType';

export interface IRequestUser extends Request{
  user?: TokenPayload
}

export interface IUser {
  getByEmail(email: string): Promise<User | null>
}
