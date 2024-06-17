const {
  getAllRoutes,
  getAllRotuesNames,
} = require('../../bll/routes-logic.js');

const {
  getAllRoutesDB,
  getRouteCoordinatesDB,
  getRouteDescriptionDB,
} = require('../../dal/route.js');

const Route = require('../../models/route.js');

jest.mock('../../dal/route.js');

const response = {
  status: jest.fn((x) => x),
  send: jest.fn((x) => x),
};

describe('getAllRoutes', () => {});

describe('getAllRotuesNames', () => {
  const fakeRoutesList = [
    new Route(
      { lat: 1, lng: 1 },
      'fake_pointsType',
      1,
      'fake_name',
      'fake_description',
      'fake_difficultyLevel',
      'fake_length',
      'fake_image',
    ),
    new Route(
      { lat: 2, lng: 2 },
      'fake_pointsType',
      2,
      'fake_name',
      'fake_description',
      'fake_difficultyLevel',
      'fake_length',
      'fake_image',
    ),
  ];

  const fakeRoutesListNames = fakeRoutesList.map((route) => route.name);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should send status code of 404 when no routes found', async () => {
    getAllRoutesDB.mockResolvedValueOnce(null);

    await getAllRotuesNames(null, response);

    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('No routes found');
  });

  it('should send status code of 200 when routes found', async () => {
    getAllRoutesDB.mockResolvedValueOnce(fakeRoutesList);

    await getAllRotuesNames(null, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith(fakeRoutesListNames);
  });
});
