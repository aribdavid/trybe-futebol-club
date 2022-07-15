export interface ILogin {
  email: string;
  password: string;
}

export type LoginReturn = {
  id: number;
  email: string;
  role: string;
};

export interface ILoginService {
  userLogin(data: ILogin): Promise<LoginReturn>
}
