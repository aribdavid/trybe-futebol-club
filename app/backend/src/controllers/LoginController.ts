import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Token from '../utils/Token';
import { ILoginService } from '../interfaces/ILogin';
import { TokenPayload } from '../types/TokenType';
import { IRequestUser } from '../interfaces/IUser';

export default class LoginController {
  constructor(private loginService: ILoginService) { }

  async userLogin(req: Request, res: Response) {
    const { id, role } = await this.loginService.userLogin(req.body);

    const token = new Token().generate(id, role);

    res.status(StatusCodes.OK).json({ token });
  }

  static validateUser(req: IRequestUser, res: Response) {
    const { role } = req.user as TokenPayload;

    res.status(StatusCodes.OK).json({ role });
  }
}