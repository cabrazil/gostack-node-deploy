import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailableService from '@modules/appointments/services/ListProviderDayAvailableService';

export default class ProviderDayAvailableController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.body;

    const listProviderDayAvailable = container.resolve(
      ListProviderDayAvailableService,
    );

    const availability = await listProviderDayAvailable.execute({
      provider_id,
      day,
      month,
      year,
    });

    return response.json(availability);
  }
}
