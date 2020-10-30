import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswdService from '@modules/users/services/ResetPasswdService';

export default class ResetPasswdController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const resetPasswd = container.resolve(ResetPasswdService);

    await resetPasswd.execute({
      token,
      password,
    });

    return response.status(204).json();
  }
}
