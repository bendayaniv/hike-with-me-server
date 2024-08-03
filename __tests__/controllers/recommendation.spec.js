const {
  getRecommendationsByRoute,
  createRecommendation,
} = require('../../bll/recommendations-logic.js');

const {
  getRecommendationsByRouteFromDB,
  addRecommendation,
} = require('../../dal/recommendation.js');

const Recommendation = require('../../models/recommendation.js');

jest.mock('../../dal/recommendation.js');

const response = {
  status: jest.fn((x) => x),
  send: jest.fn((x) => x),
  json: jest.fn((x) => x),
};

describe('getRecommendationsByRoute', () => {
  const fakeRecommendationsList = [
    new Recommendation(
      1,
      1,
      'fake_description',
      'fake_reporterName',
      'fake_routeName1',
    ),
    new Recommendation(
      2,
      2,
      'fake_description',
      'fake_reporterName',
      'fake_routeName1',
    ),
    new Recommendation(
      3,
      3,
      'fake_description',
      'fake_reporterName',
      'fake_routeName2',
    ),
  ];

  const fakeRouteName = 'fake_routeName1';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should send status code of 400 when not providing routeName', async () => {
    const request = {
      params: {
        routeName: null,
      },
    };

    await getRecommendationsByRoute(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide route name');
  });

  it('should send status code of 404 when no recommendations found', async () => {
    getRecommendationsByRouteFromDB.mockResolvedValueOnce(null);

    const request = {
      params: {
        routeName: fakeRouteName,
      },
    };

    await getRecommendationsByRoute(request, response);

    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('No recommendations found');
  });

  it('should send status code of 200 when recommendations found', async () => {
    getRecommendationsByRouteFromDB.mockResolvedValueOnce(
      fakeRecommendationsList.filter(
        (recommendation) => recommendation.routeName === fakeRouteName,
      ),
    );

    const request = {
      params: {
        routeName: fakeRouteName,
      },
    };

    await getRecommendationsByRoute(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith(
      fakeRecommendationsList.filter(
        (recommendation) => recommendation.routeName === fakeRouteName,
      ),
    );
  });
});

describe('createRecommendation', () => {
  const fake_recommendation = new Recommendation(
    1,
    1,
    'fake_description',
    'fake_reporterName',
    'fake_routeName',
  );

  // should restart the mock and restart the fake_recommendation after each test
  beforeEach(() => {
    jest.clearAllMocks();
    fake_recommendation.id = 1;
    fake_recommendation.rate = 1;
    fake_recommendation.description = 'fake_description';
    fake_recommendation.reporterName = 'fake_reporterName';
    fake_recommendation.routeName = 'fake_routeName';
  });

  it('should send status code of 401 when not providing id', async () => {
    fake_recommendation.id = null;
    const request = {
      body: fake_recommendation,
    };

    await createRecommendation(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide id');
  });

  it('should send status code of 401 when not providing rate', async () => {
    fake_recommendation.rate = null;
    const request = {
      body: fake_recommendation,
    };

    await createRecommendation(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide rate');
  });

  it('should send status code of 401 when rate is not a number', async () => {
    fake_recommendation.rate = 'not_a_number';
    const request = {
      body: fake_recommendation,
    };

    await createRecommendation(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide rate');
  });

  it('should send status code of 401 when not providing description', async () => {
    fake_recommendation.description = null;
    const request = {
      body: fake_recommendation,
    };
    await createRecommendation(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide description');
  });

  it('should send status code of 401 when not providing reporterName', async () => {
    fake_recommendation.reporterName = null;
    const request = {
      body: fake_recommendation,
    };

    await createRecommendation(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide reporterName');
  });

  it('should send status code of 401 when not providing routeName', async () => {
    fake_recommendation.routeName = null;
    const request = {
      body: fake_recommendation,
    };
    await createRecommendation(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide routeName');
  });

  it('should send status code of 200 when creating new recommendation', async () => {
    addRecommendation.mockResolvedValueOnce(fake_recommendation);

    const request = {
      body: fake_recommendation,
    };
    await createRecommendation(request, response);

    expect(addRecommendation).toHaveBeenCalledWith(fake_recommendation);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.send).toHaveBeenCalledTimes(1);
  });
});
