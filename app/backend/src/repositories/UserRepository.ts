import User from '../database/models/UserModel';
import { IUser } from '../interfaces/IUser';

export default class UserRepository implements IUser {
  constructor(private _model = User) { }

  async getByEmail(email: string): Promise<User | null> {
    const user = await this._model.findOne({ where: { email } });

    return user;
  }
}