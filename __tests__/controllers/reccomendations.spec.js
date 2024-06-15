const {
  createReccomendation,
  getRecommendationsByRoute,
} = require('../../bll/recommendations-logic.js');
const reccomendationDB = require('../../dal/reccomendation.js');
const Recommendation = require('../../models/recommendation.js');

jest.mock('../../dal/reccomendation.js');

const response = {
  status: jest.fn((x) => x),
  send: jest.fn((x) => x),
};

describe('getRecommendationsByRoute', () => {
  const fakeReccomensationsList = [
    new Recommendation(
      1,
      1,
      'fake_description',
      'fake_reporterName',
      'fake_routeName',
    ),
    new Recommendation(
      2,
      2,
      'fake_description',
      'fake_reporterName',
      'fake_routeName',
    ),
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should send status code of 404 when no recommendations found', async () => {
    reccomendationDB.getRecommendationsByRouteFromDB.mockResolvedValueOnce(
      null,
    );

    const request = {
      params: {
        routeName: 'fake_routeName',
      },
    };

    await getRecommendationsByRoute(request, response);

    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('No recommendations found');
  });

  it('should send status code of 200 when recommendations found', async () => {
    reccomendationDB.getRecommendationsByRouteFromDB.mockResolvedValueOnce(
      fakeReccomensationsList,
    );

    const request = {
      params: {
        routeName: 'fake_routeName',
      },
    };

    await getRecommendationsByRoute(request, response);

    console.log(response.send.mock.calls[0][0]);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith(fakeReccomensationsList);
  });
});

describe('createReccomendation', () => {
  const fake_reccomendation = new Recommendation(
    1,
    1,
    'fake_description',
    'fake_reporterName',
    'fake_routeName',
  );

  // should restart the mock and restart the fake_reccomendation after each test
  beforeEach(() => {
    jest.clearAllMocks();
    fake_reccomendation.id = 1;
    fake_reccomendation.rate = 1;
    fake_reccomendation.description = 'fake_description';
    fake_reccomendation.reporterName = 'fake_reporterName';
    fake_reccomendation.routeName = 'fake_routeName';
  });

  it('should send status code of 400 when not providing rate', async () => {
    fake_reccomendation.rate = null;
    const request = {
      body: fake_reccomendation,
    };

    await createReccomendation(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide rate');
  });

  it('should send status code of 400 when rate is not a number', async () => {
    fake_reccomendation.rate = 'not_a_number';
    const request = {
      body: fake_reccomendation,
    };

    await createReccomendation(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide rate');
  });

  it('should send status code of 400 when not providing description', async () => {
    fake_reccomendation.description = null;
    const request = {
      body: fake_reccomendation,
    };
    await createReccomendation(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide description');
  });

  it('should send status code of 400 when not providing routeName', async () => {
    fake_reccomendation.routeName = null;
    const request = {
      body: fake_reccomendation,
    };
    await createReccomendation(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide routeName');
  });

  it('should send status code of 200 when creating new reccomendation', async () => {
    reccomendationDB.addRecommendation.mockResolvedValueOnce(
      fake_reccomendation,
    );

    const reccomendation = new Recommendation(
      1,
      5,
      'description',
      'reporterName',
      'routeName',
    );

    const request = {
      body: reccomendation,
    };
    await createReccomendation(request, response);

    expect(reccomendationDB.addRecommendation).toHaveBeenCalledWith(
      reccomendation,
    );
    expect(response.status).toHaveBeenCalledWith(200);
  });
});
