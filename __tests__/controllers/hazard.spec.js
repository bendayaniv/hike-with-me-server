const {
  getAllHazards,
  getNearHazards,
  getAllHazardsByRoute,
  addHazard,
} = require('../../bll/hazards-logic.js');

const {
  getAllHazardsDB,
  getAllHazardsByRouteDB,
  addHazardDB,
} = require('../../dal/hazard.js');

const { distanceMeasurement, getUserByIdDB } = require('../../dal/user.js');

const Hazard = require('../../models/hazard.js');
const Location = require('../../models/location.js');

jest.mock('../../dal/hazard.js');
jest.mock('../../dal/user.js');

const response = {
  status: jest.fn((x) => x),
  send: jest.fn((x) => x),
  json: jest.fn((x) => x),
};

describe('getAllHazards', () => {
  const fakeHazardsList = [
    new Hazard(
      new Location(1, 1, 'fake_date'),
      'fake_type',
      'fake_id',
      'fake_hazardType',
      'fake_description',
      'fake_severity',
      'fake_reporterId',
      'fake_routeName',
    ),
    new Hazard(
      new Location(2, 2, 'fake_date'),
      'fake_type',
      'fake_id',
      'fake_hazardType',
      'fake_description',
      'fake_severity',
      'fake_reporterId',
      'fake_routeName',
    ),
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should send status code of 404 when no hazards found', async () => {
    getAllHazardsDB.mockResolvedValueOnce(null);

    await getAllHazards(null, response);

    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('No hazards found');
  });

  it('should send status code of 200 when hazards found', async () => {
    getAllHazardsDB.mockResolvedValueOnce(fakeHazardsList);

    await getAllHazards(null, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith(fakeHazardsList);
  });
});

describe('getAllHazardsByRoute', () => {
  const fakeHazardsList = [
    new Hazard(
      new Location(1, 1, 'fake_date'),
      'fake_type',
      'fake_id',
      'fake_hazardType',
      'fake_description',
      'fake_severity',
      'fake_reporterId',
      'fake_routeName',
    ),
    new Hazard(
      new Location(2, 2, 'fake_date'),
      'fake_type',
      'fake_id',
      'fake_hazardType',
      'fake_description',
      'fake_severity',
      'fake_reporterId',
      'fake_routeName',
    ),
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should send status code of 401 when no routeName provided', async () => {
    const request = {
      params: {
        routeName: null,
      },
    };

    await getAllHazardsByRoute(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide route name');
  });

  it('should send status code of 404 when no hazards found', async () => {
    getAllHazardsByRouteDB.mockResolvedValueOnce(null);

    const request = {
      params: {
        routeName: 'fake_routeName',
      },
    };

    await getAllHazardsByRoute(request, response);

    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('No hazards found');
  });

  it('should send status code of 200 when hazards found', async () => {
    getAllHazardsByRouteDB.mockResolvedValueOnce(fakeHazardsList);

    const request = {
      params: {
        routeName: 'fake_routeName',
      },
    };

    await getAllHazardsByRoute(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith(fakeHazardsList);
  });
});

describe('getNearHazards', () => {
  const fakeHazardsList = {
    trip1: {
      hazard1: {
        _location: { latitude: '1', longitude: '1', date: 'fake_date' },
        _type: 'fake_type',
        _id: 'fake_id',
        _hazardType: 'fake_hazardType',
        _description: 'fake_description',
        _severity: 'fake_severity',
        _reporterId: 'fake_reporterId',
        _routeName: 'fake_routeName',
      },
    },
  };

  const fakeReturnHazardList = [
    {
      _description: 'fake_description',
      _hazardType: 'fake_hazardType',
      _id: 'fake_id',
      _location: { date: 'fake_date', latitude: '1', longitude: '1' },
      _reporterId: 'fake_reporterId',
      _routeName: 'fake_routeName',
      _severity: 'fake_severity',
      _type: 'fake_type',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should send status code of 401 when no userId provided', async () => {
    const request = {
      params: {
        userId: null,
      },
    };

    await getNearHazards(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
  });

  it('should send status code of 404 when no hazards found', async () => {
    getAllHazardsDB.mockResolvedValueOnce(null);

    const request = {
      params: {
        userId: 'fake_userId',
      },
    };

    await getNearHazards(request, response);

    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.send).toHaveBeenCalledTimes(1);
  });

  it("should send status code of 200 when no hazards found near user's location", async () => {
    getAllHazardsDB.mockResolvedValueOnce(fakeHazardsList);
    getUserByIdDB.mockResolvedValueOnce({
      userId: 'fake_userId',
      location: { latitude: 1, longitude: 1, date: 'fake_date' },
    });
    distanceMeasurement.mockReturnValueOnce(0.6);

    const request = {
      params: {
        userId: 'fake_userId',
      },
    };

    await getNearHazards(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.send).toHaveBeenCalledTimes(1);
  });

  it('should send status code 404 when there is no hazard to send to the user', async () => {
    getAllHazardsDB.mockResolvedValueOnce(null);

    getUserByIdDB.mockResolvedValueOnce('fake_reporterId');

    const request = {
      params: {
        userId: 'fake_reporterId',
      },
    };

    await getNearHazards(request, response);

    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.send).toHaveBeenCalledTimes(1);
  });

  it('should send status code of 200 when hazards found', async () => {
    getAllHazardsDB.mockResolvedValueOnce(fakeHazardsList);
    getUserByIdDB.mockResolvedValueOnce({
      location: { latitude: 1, longitude: 1, date: 'fake_date' },
    });
    distanceMeasurement.mockReturnValueOnce(0.4);

    const request = {
      params: {
        userId: 'fake_userId',
      },
    };

    await getNearHazards(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith(fakeReturnHazardList);
  });
});

describe('addHazard', () => {
  const fake_hazard = new Hazard(
    new Location(1, 1, 'fake_date'),
    'fake_type',
    'fake_id',
    'fake_hazardType',
    'fake_description',
    'fake_severity',
    'fake_reporterId',
    'fake_routeName',
  );

  beforeEach(() => {
    jest.clearAllMocks();
    fake_hazard._location = new Location(1, 1, 'fake_date');
    fake_hazard._type = 'fake_type';
    fake_hazard._id = 'fake_id';
    fake_hazard._hazardType = 'fake_hazardType';
    fake_hazard._description = 'fake_description';
    fake_hazard._severity = 'fake_severity';
    fake_hazard._reporterId = 'fake_reporterId';
    fake_hazard._routeName = 'fake_routeName';
  });

  it('should send status code of 401 when no location provided', async () => {
    fake_hazard._location = new Location(null, 1, 'fake_date');
    const request = {
      body: fake_hazard,
    };

    await addHazard(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith(
      'Please provide latitude and longitude',
    );
  });

  it('should send status code of 401 when no hazardType provided', async () => {
    fake_hazard._hazardType = null;
    const request = {
      body: fake_hazard,
    };

    await addHazard(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide hazard type');
  });

  it('should send status code of 401 when no id provided', async () => {
    fake_hazard._id = null;
    const request = {
      body: fake_hazard,
    };

    await addHazard(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide id');
  });

  it('should send status code of 401 when no description provided', async () => {
    fake_hazard._description = null;
    const request = {
      body: fake_hazard,
    };

    await addHazard(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide description');
  });

  it('should send status code of 401 when no severity provided', async () => {
    fake_hazard._severity = null;
    const request = {
      body: fake_hazard,
    };

    await addHazard(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide severity');
  });

  it('should send status code of 401 when no reporterId provided', async () => {
    fake_hazard._reporterId = null;
    const request = {
      body: fake_hazard,
    };

    await addHazard(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide reporter name');
  });

  it('should send status code of 401 when no routeName provided', async () => {
    fake_hazard._routeName = null;
    const request = {
      body: fake_hazard,
    };

    await addHazard(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide route name');
  });

  it('should send status code of 200 when creating new hazard', async () => {
    addHazardDB.mockResolvedValueOnce(fake_hazard);

    const request = {
      body: fake_hazard,
    };

    await addHazard(request, response);

    expect(addHazardDB).toHaveBeenCalledWith(fake_hazard);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.send).toHaveBeenCalledTimes(1);
  });
});
