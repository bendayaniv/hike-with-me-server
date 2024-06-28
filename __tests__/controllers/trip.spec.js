const {
  getTripsByUser,
  createTrip,
  updateTrip,
  deleteTrip,
  uploadImages,
  getAllUserImagesByTrip,
  removeImageFromTrip,
} = require('../../bll/trips-logic.js');

const {
  getTripsByUserDB,
  createTripDB,
  updateTripDB,
  deleteTripDB,
  uploadImagesDB,
  getAllUserImagesByTripDB,
  removeImageFromTripDB,
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

  it('should send status code of 401 when no userId provided', async () => {
    const request = {
      params: {
        userId: null,
      },
    };

    await getTripsByUser(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide userId');
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

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith(
      fakeTripsList.filter((trip) => trip.userId === fakeUserId),
    );
  });
});

describe('createTrip', () => {
  const fake_trip = new Trip(
    '1',
    'fake_name',
    'fake_startDate',
    'fake_endDate',
    'fake_locations',
    'fake_description',
    'fake_routesNames',
    'fake_userId1',
  );

  // should restart the mock and restart the fake_trip after each test
  beforeEach(() => {
    jest.clearAllMocks();
    fake_trip.id = '1';
    fake_trip.name = 'fake_name';
    fake_trip.startDate = 'fake_startDate';
    fake_trip.endDate = 'fake_endDate';
    fake_trip.locations = 'fake_locations';
    fake_trip.description = 'fake_description';
    fake_trip.routesNames = 'fake_routesNames';
    fake_trip.userId = 'fake_userId1';
  });

  it('should send status code of 401 when no id provided', async () => {
    fake_trip.id = null;
    const request = {
      body: fake_trip,
    };

    await createTrip(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide id');
  });

  it('should send status code of 401 when no name provided', async () => {
    fake_trip.name = null;
    const request = {
      body: fake_trip,
    };

    await createTrip(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide name');
  });

  it('should send status code of 401 when no startDate provided', async () => {
    fake_trip.startDate = null;
    const request = {
      body: fake_trip,
    };

    await createTrip(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide startDate');
  });

  it('should send status code of 401 when no endDate provided', async () => {
    fake_trip.endDate = null;
    const request = {
      body: fake_trip,
    };

    await createTrip(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide endDate');
  });

  it('should send status code of 401 when no description provided', async () => {
    fake_trip.description = null;
    const request = {
      body: fake_trip,
    };

    await createTrip(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide description');
  });

  it('should send status code of 401 when no userId provided', async () => {
    fake_trip.userId = null;
    const request = {
      body: fake_trip,
    };

    await createTrip(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide userId');
  });

  it('should send status code of 200 when creating new trip', async () => {
    createTripDB.mockResolvedValueOnce(fake_trip);

    const request = {
      body: fake_trip,
    };

    await createTrip(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith(fake_trip);
  });
});

describe('updateTrip', () => {
  const fake_trip = new Trip(
    '1',
    'fake_name',
    'fake_startDate',
    'fake_endDate',
    'fake_locations',
    'fake_description',
    'fake_routesNames',
    'fake_userId1',
  );

  // should restart the mock and restart the fake_trip after each test
  beforeEach(() => {
    jest.clearAllMocks();
    fake_trip.id = '1';
    fake_trip.name = 'fake_name';
    fake_trip.startDate = 'fake_startDate';
    fake_trip.endDate = 'fake_endDate';
    fake_trip.locations = 'fake_locations';
    fake_trip.description = 'fake_description';
    fake_trip.routesNames = 'fake_routesNames';
    fake_trip.userId = 'fake_userId1';
  });

  it('should send status code of 401 when no id provided', async () => {
    fake_trip.id = null;
    const request = {
      body: fake_trip,
    };

    await updateTrip(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide id');
  });

  it('should send status code of 401 when no name provided', async () => {
    fake_trip.name = null;
    const request = {
      body: fake_trip,
    };

    await updateTrip(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide name');
  });

  it('should send status code of 401 when no startDate provided', async () => {
    fake_trip.startDate = null;
    const request = {
      body: fake_trip,
    };

    await updateTrip(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide startDate');
  });

  it('should send status code of 401 when no endDate provided', async () => {
    fake_trip.endDate = null;
    const request = {
      body: fake_trip,
    };

    await updateTrip(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide endDate');
  });

  it('should send status code of 401 when no description provided', async () => {
    fake_trip.description = null;
    const request = {
      body: fake_trip,
    };

    await updateTrip(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide description');
  });

  it('should send status code of 401 when no userId provided', async () => {
    fake_trip.userId = null;
    const request = {
      body: fake_trip,
    };

    await updateTrip(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide userId');
  });

  it('should send status code of 200 when updating trip', async () => {
    updateTripDB.mockResolvedValueOnce(fake_trip);

    const request = {
      body: fake_trip,
    };

    await updateTrip(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith(fake_trip);
  });
});

describe('deleteTrip', () => {
  const fake_information = {
    userId: 'fake_userId',
    tripId: 'fake_tripId',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    fake_information.userId = 'fake_userId';
    fake_information.tripId = 'fake_tripId';
  });

  it('should send status code of 401 when no userId provided', async () => {
    fake_information.userId = null;
    const request = {
      params: fake_information,
    };

    await deleteTrip(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide userId');
  });

  it('should send status code of 401 when no tripId provided', async () => {
    fake_information.tripId = null;
    const request = {
      params: fake_information,
    };

    await deleteTrip(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide tripId');
  });

  it('should send status code of 200 when deleting trip', async () => {
    deleteTripDB.mockResolvedValueOnce('Trip deleted');

    const request = {
      params: fake_information,
    };

    await deleteTrip(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Trip deleted');
  });
});

describe('uploadImages', () => {
  const fake_information = {
    userName: 'fake_userName',
    tripName: 'fake_tripName',
  };
  const fake_files = [
    {
      originalname: 'fake_originalname1',
      location: 'fake_location1',
    },
    {
      originalname: 'fake_originalname2',
      location: 'fake_location2',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    fake_information.userName = 'fake_userName';
    fake_information.tripName = 'fake_tripName';
  });

  it('should send status code of 401 when no images provided', async () => {
    const request = {
      files: null,
    };

    await uploadImages(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide images');
  });

  it('should send status code of 401 when no userName provided', async () => {
    fake_information.userName = null;
    const request = {
      files: fake_files,
      body: fake_information,
    };

    await uploadImages(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide userName');
  });

  it('should send status code of 401 when no tripName provided', async () => {
    fake_information.tripName = null;
    const request = {
      files: fake_files,
      body: fake_information,
    };

    await uploadImages(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide tripName');
  });

  it('should send status code of 200 when uploading images', async () => {
    uploadImagesDB.mockResolvedValueOnce(fake_files);

    const request = {
      files: fake_files,
      body: fake_information,
    };

    await uploadImages(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Images uploaded');
  });
});

describe('getAllUserImagesByTrip', () => {
  const fake_information = {
    userName: 'fake_userName',
    tripName: 'fake_tripName',
  };
  const fake_files = [
    {
      originalname: 'fake_originalname1',
      tripName: 'fake_tripName1',
    },
    {
      originalname: 'fake_originalname2',
      tripName: 'fake_tripName2',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    fake_information.userName = 'fake_userName';
    fake_information.tripName = 'fake_tripName';
  });

  it('should send status code of 401 when no userName provided', async () => {
    fake_information.userName = null;
    const request = {
      params: fake_information,
    };

    await getAllUserImagesByTrip(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide userName');
  });

  it('should send status code of 401 when no tripName provided', async () => {
    fake_information.tripName = null;
    const request = {
      params: fake_information,
    };

    await getAllUserImagesByTrip(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide tripName');
  });

  it('should send status code of 404 when no images found', async () => {
    getAllUserImagesByTripDB.mockResolvedValueOnce(null);

    const request = {
      params: fake_information,
    };

    await getAllUserImagesByTrip(request, response);

    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('No images found');
  });

  it('should send status code of 200 when images found', async () => {
    getAllUserImagesByTripDB.mockResolvedValueOnce(fake_files);

    const request = {
      params: fake_information,
    };

    await getAllUserImagesByTrip(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith(fake_files);
  });
});

describe('removeImageFromTrip', () => {
  const fake_information = {
    userName: 'fake_userName',
    tripName: 'fake_tripName',
    imageName: 'fake_imageName',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    fake_information.userName = 'fake_userName';
    fake_information.tripName = 'fake_tripName';
    fake_information.imageName = 'fake_imageName';
  });

  it('should send status code of 401 when no userName provided', async () => {
    fake_information.userName = null;
    const request = {
      params: fake_information,
    };

    await removeImageFromTrip(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide userName');
  });

  it('should send status code of 401 when no tripName provided', async () => {
    fake_information.tripName = null;
    const request = {
      params: fake_information,
    };

    await removeImageFromTrip(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide tripName');
  });

  it('should send status code of 401 when no imageName provided', async () => {
    fake_information.imageName = null;
    const request = {
      params: fake_information,
    };

    await removeImageFromTrip(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide imageName');
  });

  it("should send status code of 404 when image doesn't exist", async () => {
    removeImageFromTripDB.mockResolvedValueOnce('Image does not exist');

    const request = {
      params: fake_information,
    };

    await removeImageFromTrip(request, response);

    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Image does not exist');
  });

  it('should send status code of 200 when image removed', async () => {
    removeImageFromTripDB.mockResolvedValueOnce('Image removed');

    const request = {
      params: fake_information,
    };

    await removeImageFromTrip(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Image removed');
  });
});
