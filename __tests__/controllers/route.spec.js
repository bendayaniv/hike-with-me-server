const { get } = require('mongoose');
const {
  getAllRoutes,
  getAllRotuesNames,
} = require('../../bll/routes-logic.js');

const {
  getAllRoutesDB,
  getRouteDescriptionDB,
  getRouteCoordinatesDB,
} = require('../../dal/route.js');

const Route = require('../../models/route.js');

jest.mock('../../dal/route.js');

const response = {
  status: jest.fn((x) => x),
  send: jest.fn((x) => x),
};

const fakeRoutesList = [
  new Route(
    { latitude: 1, longitude: 1, date: null },
    'Route',
    '1',
    'Makhtesh Ramon',
    'fake_description',
    'Medium',
    '3.5 km',
    'fake_image',
  ),
  new Route(
    { latitude: 1, longitude: 1, date: null },
    'Route',
    '2',
    "Wadi Murabba'at",
    'fake_description',
    'Medium',
    '4 km',
    'fake_image',
  ),
];

describe('getAllRoutes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should send status code of 404 when no routes found', async () => {
    getAllRoutesDB.mockResolvedValueOnce(null);

    await getAllRoutes(null, response);

    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('No routes found');
  });

  it('should send status code of 200 when routes found', async () => {
    getAllRoutesDB.mockResolvedValueOnce(fakeRoutesList);
    getRouteDescriptionDB.mockResolvedValue({
      description: 'fake_description',
      image: 'fake_image',
    });
    getRouteCoordinatesDB.mockResolvedValue({
      latitude: 1,
      longitude: 1,
      date: null,
    });

    await getAllRoutes(null, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith(fakeRoutesList);
  });
});

describe('getAllRotuesNames', () => {
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

  it('should send status code of 404 when no namse found', async () => {
    getAllRoutesDB.mockResolvedValueOnce([]);

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
