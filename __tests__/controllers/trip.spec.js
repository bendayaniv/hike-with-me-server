const { getTripsByUser } = require('../../bll/trips-logic.js');

const {
  getTripsByUserDB,
  createTripDB,
  updateTripDB,
  deleteTripDB,
  uploadImagesDB,
  getAllUserImagesByTripDB,
} = require('../../dal/trip.js');

const Trip = require('../../models/trip.js');

jest.mock('../../dal/trip.js');

const response = {
  status: jest.fn((x) => x),
  send: jest.fn((x) => x),
};

describe('getTripsByUser', () => {
  const fakeTripsList = [
    new Trip(
      '1',
      'fake_name',
      'fake_startDate',
      'fake_endDate',
      'fake_locations',
      'fake_description',
      'fake_routesNames',
      'fake_userId1',
    ),
    new Trip(
      '2',
      'fake_name',
      'fake_startDate',
      'fake_endDate',
      'fake_locations',
      'fake_description',
      'fake_routesNames',
      'fake_userId1',
    ),
    new Trip(
      '3',
      'fake_name',
      'fake_startDate',
      'fake_endDate',
      'fake_locations',
      'fake_description',
      'fake_routesNames',
      'fake_userId2',
    ),
  ];

  const fakeUserId = 'fake_userId1';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should send status code of 404 when no trips found', async () => {
    getTripsByUserDB.mockResolvedValueOnce(null);

    const request = {
      params: {
        userId: fakeUserId,
      },
    };

    await getTripsByUser(request, response);

    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('No trips found');
  });

  it('should send status code of 200 when trips found', async () => {
    getTripsByUserDB.mockResolvedValueOnce(
      fakeTripsList.filter((trip) => trip.userId === fakeUserId),
    );

    const request = {
      params: {
        userId: fakeUserId,
      },
    };

    await getTripsByUser(request, response);

    console.log(response.send.mock.calls.toString());

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith(
      fakeTripsList.filter((trip) => trip.userId === fakeUserId),
    );
  });
});
