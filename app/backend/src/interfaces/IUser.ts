import User from '../database/models/UserModel';
import { Request } from 'express';
import { TokenPayload } from '../types/TokenType';

export interface IRequestUser extends Request{
  user?: TokenPayload
}

export interface IUser {
  getByEmail(email: string): Promise<User | null>
}