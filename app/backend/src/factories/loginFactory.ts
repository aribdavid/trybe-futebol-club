import LoginController from '../controllers/LoginController';
import UserRepository from '../repositories/UserRepository';
import LoginService from '../services/LoginService';

export default () => {
  const model = new UserRepository();
  const service = new LoginService(model);
  const controller = new LoginController(service);

  return controller;
};
