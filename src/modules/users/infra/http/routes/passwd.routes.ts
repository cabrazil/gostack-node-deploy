import { Router } from 'express';

import ForgotPasswdController from '../controllers/ForgotPasswdController';
import ResetPasswdController from '../controllers/ResetPasswdController';

const passwdRouter = Router();
const forgotPasswdController = new ForgotPasswdController();
const resetPasswdController = new ResetPasswdController();

passwdRouter.post('/forgot', forgotPasswdController.create);
passwdRouter.post('/reset', resetPasswdController.create);

export default passwdRouter;
