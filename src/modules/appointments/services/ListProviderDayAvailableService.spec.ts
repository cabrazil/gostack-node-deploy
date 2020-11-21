import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailableService from './ListProviderDayAvailableService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailable: ListProviderDayAvailableService;

describe('ListProviderDayAvailable', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailable = new ListProviderDayAvailableService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the available day from a provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'any user',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'any user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });

    const available = await listProviderDayAvailable.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(available).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ]),
    );
  });
});