import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UserMap from '@modules/users/mappers/UserMap';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const updateUserAvatar = container.resolve(UpdateUserAvatarService);

      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      });

      // delete user.password;
      const mappedUser = UserMap.toDTO(user);

      return response.json(mappedUser);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
