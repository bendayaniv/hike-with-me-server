const { createReccomendation } = require('../../bll/recommendations-logic.js');
const reccomendationDB = require('../../dal/reccomendation.js');
const Recommendation = require('../../models/recommendation.js');

const fake_reccomendation = new Recommendation(
  1,
  1,
  'fake_description',
  'fake_reporterName',
  'fake_routeName',
);

jest.mock('../../dal/reccomendation.js');

const response = {
  status: jest.fn((x) => x),
  send: jest.fn((x) => x),
};

describe('createReccomendation', () => {
  // should restart the mock after each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // should restart the fake reccomendation after each test
  beforeEach(() => {
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
  });
});
