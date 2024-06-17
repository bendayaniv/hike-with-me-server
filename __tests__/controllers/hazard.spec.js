const {
  getAllHazards,
  getAllHazardsByRoute,
  addHazard,
} = require('../../bll/hazards-logic.js');

const {
  getAllHazardsDB,
  getAllHazardsByRouteDB,
  addHazardDB,
} = require('../../dal/hazard.js');

const Hazard = require('../../models/hazard.js');
const Location = require('../../models/location.js');

jest.mock('../../dal/hazard.js');

const response = {
  status: jest.fn((x) => x),
  send: jest.fn((x) => x),
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
      'fake_reporterName',
      'fake_routeName',
    ),
    new Hazard(
      new Location(2, 2, 'fake_date'),
      'fake_type',
      'fake_id',
      'fake_hazardType',
      'fake_description',
      'fake_severity',
      'fake_reporterName',
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
      'fake_reporterName',
      'fake_routeName',
    ),
    new Hazard(
      new Location(2, 2, 'fake_date'),
      'fake_type',
      'fake_id',
      'fake_hazardType',
      'fake_description',
      'fake_severity',
      'fake_reporterName',
      'fake_routeName',
    ),
  ];

  beforeEach(() => {
    jest.clearAllMocks();
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

describe('addHazard', () => {
  const fake_hazard = new Hazard(
    new Location(1, 1, 'fake_date'),
    'fake_type',
    'fake_id',
    'fake_hazardType',
    'fake_description',
    'fake_severity',
    'fake_reporterName',
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
    fake_hazard._reporterName = 'fake_reporterName';
    fake_hazard._routeName = 'fake_routeName';
  });

  it('should send status code of 400 when no location provided', async () => {
    fake_hazard._location = new Location(null, 1, 'fake_date');
    const request = {
      body: fake_hazard,
    };

    await addHazard(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith(
      'Please provide latitude and longitude',
    );
  });

  it('should send status code of 400 when no hazardType provided', async () => {
    fake_hazard._hazardType = null;
    const request = {
      body: fake_hazard,
    };

    await addHazard(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide hazard type');
  });

  it('should send status code of 400 when no description provided', async () => {
    fake_hazard._description = null;
    const request = {
      body: fake_hazard,
    };

    await addHazard(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide description');
  });

  it('should send status code of 400 when no severity provided', async () => {
    fake_hazard._severity = null;
    const request = {
      body: fake_hazard,
    };

    await addHazard(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide severity');
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
