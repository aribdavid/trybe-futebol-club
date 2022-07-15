import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import loginFactory from '../factories/loginFactory';
import authToken from '../middlewares/authToken';
import loginValidator from '../middlewares/loginValidator';

const router = Router();

router.get(
  '/validate',
  authToken,
  (req, res) => LoginController.validateUser(req, res),
);

router.post('/', loginValidator, (req, res) => loginFactory().userLogin(req, res));

export default router;
