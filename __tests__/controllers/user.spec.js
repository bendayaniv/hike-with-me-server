const {
  getAllActiveUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
} = require('../../bll/users-logic.js');

const {
  getAllUsersDB,
  getUserByIdDB,
  addUserDB,
  updateUserDB,
  deleteUserDB,
  distanceMeasurement,
} = require('../../dal/user.js');

const User = require('../../models/user.js');

jest.mock('../../dal/user.js');

const response = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn(),
  json: jest.fn((x) => x),
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

  it('should send code 401 if no userId provided', async () => {
    const request = { params: {} };

    await getAllActiveUsers(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
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
    const mockDistanceMeasurement = jest.fn().mockReturnValue(fakeDistance);
    distanceMeasurement.mockImplementationOnce(mockDistanceMeasurement);

    const request = { params: { userId: fakeUserId } };

    await getAllActiveUsers(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith([fakeActiveUsersList]);
  });
});

describe('getUserById', () => {
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

  it('should send code 401 if no userId provided', async () => {
    const request = { params: {} };

    await getUserById(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
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

describe('addUser', () => {
  const fakeUser = new User(
    '1',
    'John Doe',
    'email@email.com',
    'password',
    '1234567890',
    'Hometown',
    true,
    { latitude: 37.4219983, longitude: -122.084 },
  );

  beforeEach(() => {
    jest.clearAllMocks();
    fakeUser.id = '1';
    fakeUser.name = 'John Doe';
    fakeUser.email = 'email@email.com';
    fakeUser.password = 'password';
    fakeUser.phoneNumber = '1234567890';
    fakeUser.hometown = 'Hometown';
    fakeUser.active = true;
    fakeUser.location = { latitude: 37.4219983, longitude: -122.084 };
  });

  it('should send code 401 if no id provided', async () => {
    fakeUser.id = null;
    const request = { body: fakeUser };

    await addUser(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide id');
  });

  it('should send code 401 if no name provided', async () => {
    fakeUser.name = null;
    const request = { body: fakeUser };

    await addUser(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide name');
  });

  it('should send code 401 if no email provided', async () => {
    fakeUser.email = null;
    const request = { body: fakeUser };

    await addUser(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide email');
  });

  it('should send code 401 if email is not valid', async () => {
    fakeUser.email = 'email';

    const request = { body: fakeUser };

    await addUser(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide correct email');
  });

  it('should send code 401 if no password provided', async () => {
    fakeUser.password = null;

    const request = { body: fakeUser };

    await addUser(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide password');
  });

  it('should send code 401 if password is not valid', async () => {
    fakeUser.password = 'pa';

    const request = { body: fakeUser };

    await addUser(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith(
      'Please provide correct password',
    );
  });

  it('should send code 400 if there is exisitng user with the same email or password', async () => {
    getAllUsersDB.mockResolvedValueOnce([fakeUser]);

    const request = { body: fakeUser };

    await addUser(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith(
      'User already exist with this email or password',
    );
  });

  it('should send code 401 if no phoneNumber provided', async () => {
    fakeUser.phoneNumber = null;
    getAllUsersDB.mockResolvedValueOnce([]);

    const request = { body: fakeUser };

    await addUser(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide phoneNumber');
  });

  it('should send code 401 if phoneNumber is not valid', async () => {
    fakeUser.phoneNumber = '123';
    getAllUsersDB.mockResolvedValueOnce([]);

    const request = { body: fakeUser };

    await addUser(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith(
      'Please provide correct phoneNumber',
    );
  });

  it('should send code 401 if no hometown provided', async () => {
    fakeUser.hometown = null;
    getAllUsersDB.mockResolvedValueOnce([]);

    const request = { body: fakeUser };

    await addUser(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide hometown');
  });

  it('should send status code of 200 when user added', async () => {
    getAllUsersDB.mockResolvedValueOnce([]);
    addUserDB.mockResolvedValueOnce(fakeUser);

    const request = { body: fakeUser };

    await addUser(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith(fakeUser);
  });
});

describe('updateUser', () => {
  const fakeUser = new User(
    '1',
    'John Doe',
    'email@email.com',
    'password',
    '1234567890',
    'Hometown',
    true,
    { latitude: 37.4219983, longitude: -122.084 },
  );

  beforeEach(() => {
    jest.clearAllMocks();
    fakeUser.id = '1';
    fakeUser.name = 'John Doe';
    fakeUser.email = 'email@email.com';
    fakeUser.password = 'password';
    fakeUser.phoneNumber = '1234567890';
    fakeUser.hometown = 'Hometown';
    fakeUser.active = true;
    fakeUser.location = { latitude: 37.4219983, longitude: -122.084 };
  });

  it('should send code 401 if no id provided', async () => {
    fakeUser.id = null;
    const request = { body: fakeUser };

    await updateUser(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide id');
  });

  it('should send code 401 if no name provided', async () => {
    fakeUser.name = null;
    const request = { body: fakeUser };

    await updateUser(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide name');
  });

  it('should send code 401 if no email provided', async () => {
    fakeUser.email = null;
    const request = { body: fakeUser };

    await updateUser(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide email');
  });

  it('should send code 401 if email is not valid', async () => {
    fakeUser.email = 'email';

    const request = { body: fakeUser };

    await updateUser(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide correct email');
  });

  it('should send code 401 if no password provided', async () => {
    fakeUser.password = null;

    const request = { body: fakeUser };

    await updateUser(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide password');
  });

  it('should send code 401 if password is not valid', async () => {
    fakeUser.password = 'pa';

    const request = { body: fakeUser };

    await updateUser(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith(
      'Please provide correct password',
    );
  });

  it('should send code 401 if no phoneNumber provided', async () => {
    fakeUser.phoneNumber = null;

    const request = { body: fakeUser };

    await updateUser(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide phoneNumber');
  });

  it('should send code 401 if phoneNumber is not valid', async () => {
    fakeUser.phoneNumber = '123';

    const request = { body: fakeUser };

    await updateUser(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith(
      'Please provide correct phoneNumber',
    );
  });

  it('should send code 401 if no hometown provided', async () => {
    fakeUser.hometown = null;

    const request = { body: fakeUser };

    await updateUser(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide hometown');
  });

  it('should send status code of 200 when user updated', async () => {
    updateUserDB.mockResolvedValueOnce(fakeUser);

    const request = { body: fakeUser };

    await updateUser(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith(fakeUser);
  });
});

describe('deleteUser', () => {
  const fakeUserId = '1';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should send code 401 if no userId provided', async () => {
    const request = { params: {} };

    await deleteUser(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('Please provide userId');
  });

  it('should send code 404 if no user found', async () => {
    getUserByIdDB.mockResolvedValueOnce(null);

    const request = { params: { id: fakeUserId } };

    await deleteUser(request, response);

    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('User not found');
  });

  it('should send status code of 200 when user deleted', async () => {
    getUserByIdDB.mockResolvedValueOnce({ id: fakeUserId });
    deleteUserDB.mockResolvedValueOnce();

    const request = { params: { id: fakeUserId } };

    await deleteUser(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith('User deleted');
  });
});
