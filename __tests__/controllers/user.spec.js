const { getAllActiveUsers, getUserById } = require('../../bll/users-logic.js');

const {
  getAllUsersDB,
  getUserByIdDB,
  addUserDB,
  updateUserDB,
  deleteUserDB,
  haversineDistance,
  checkingEmail,
  checkingPassword,
  checkingPhoneNumber,
} = require('../../dal/user.js');

const User = require('../../models/user.js');

jest.mock('../../dal/user.js');

const response = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn(),
};

describe('getAllActiveUsers', () => {
  const fakeUsersList = [
    new User(
      '1',
      'John Doe',
      'email@email.com',
      'password',
      '1234567890',
      'Hometown',
      true,
      { latitude: 37.4219983, longitude: -122.084 },
    ),
    new User(
      '2',
      'Jane Doe',
      'email@email.com',
      'password',
      '1234567890',
      'Hometown',
      true,
      { latitude: 40.6892, longitude: -74.0445 },
    ),
  ];

  const fakeDistance = 4112.27;

  const fakeActiveUsersList = {
    user: fakeUsersList[1],
    distance: fakeDistance,
  };

  const fakeUserId = '1';

  beforeEach(() => {
    jest.clearAllMocks();
    fakeUsersList[0].active = true;
    fakeUsersList[1].active = true;
  });

  it('should send code 400 if no userId provided', async () => {
    const request = { params: {} };

    await getAllActiveUsers(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide userId');
  });

  it('should send code 404 if no users found', async () => {
    getAllUsersDB.mockResolvedValueOnce([]);

    const request = { params: { userId: fakeUserId } };

    await getAllActiveUsers(request, response);

    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('No users found');
  });

  it('should send code 404 if no user found', async () => {
    getAllUsersDB.mockResolvedValueOnce(fakeUsersList);
    getUserByIdDB.mockResolvedValueOnce(null);

    const request = { params: { userId: fakeUserId } };

    await getAllActiveUsers(request, response);

    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('No user found');
  });

  it('should send code 404 if no active users found', async () => {
    fakeUsersList[1].active = false;
    getAllUsersDB.mockResolvedValueOnce(fakeUsersList);
    getUserByIdDB.mockResolvedValueOnce(fakeUsersList[0]);

    const request = { params: { userId: fakeUserId } };

    await getAllActiveUsers(request, response);

    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('No active users found');
  });

  it('should send status code of 200 when users found', async () => {
    getAllUsersDB.mockResolvedValueOnce(fakeUsersList);
    getUserByIdDB.mockResolvedValueOnce(fakeUsersList[0]);
    const mockHaversineDistance = jest.fn().mockReturnValue(fakeDistance);
    haversineDistance.mockImplementationOnce(mockHaversineDistance);

    const request = { params: { userId: fakeUserId } };

    await getAllActiveUsers(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith([fakeActiveUsersList]);
  });
});

describe.only('getUserById', () => {
  const fakeUserId = '1';
  const fakeUser = new User(
    '1',
    'John Doe',
    'email',
    'password',
    '1234567890',
    'Hometown',
    true,
    { latitude: 37.4219983, longitude: -122.084 },
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should send code 400 if no userId provided', async () => {
    const request = { params: {} };

    await getUserById(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide userId');
  });

  it('should send code 404 if no user found', async () => {
    getUserByIdDB.mockResolvedValueOnce(null);

    const request = { params: { id: fakeUserId } };

    await getUserById(request, response);

    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('User not found');
  });

  it('should send status code of 200 when user found', async () => {
    getUserByIdDB.mockResolvedValueOnce(fakeUser);

    const request = { params: { id: fakeUserId } };

    await getUserById(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith(fakeUser);
  });
});
