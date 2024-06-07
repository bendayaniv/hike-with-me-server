const supertest = require('supertest');
const app = require('../../server.js');

describe('POST /addUser', () => {
  describe('given a valid user object', () => {
    test('should respond with a 200 status code', async () => {
      const user = {
        id: 'id',
        name: 'name',
        email: 'email',
        password: 'password',
        phoneNumber: 'phoneNumber',
      };

      const response = await supertest(app).post('/users/addUser').send(user);

      expect(response.statusCode).toBe(200);

      // Clean up
      await supertest(app).delete(`/users/${user.id}`);
    });
  });

  describe('given an invalid user object', () => {
    test('should response with 400 status code with missing id', async () => {
      const user = {
        name: 'name',
        email: 'email',
        password: 'password',
        phoneNumber: 'phoneNumber',
      };

      const response = await supertest(app).post('/users/addUser').send(user);

      expect(response.statusCode).toBe(400);
    });

    test('should response with 400 status code with missing name', async () => {
      const user = {
        id: 'id',
        email: 'email',
        password: 'password',
        phoneNumber: 'phoneNumber',
      };

      const response = await supertest(app).post('/users/addUser').send(user);

      expect(response.statusCode).toBe(400);
    });

    test('should response with 400 status code with missing email', async () => {
      const user = {
        id: 'id',
        name: 'name',
        password: 'password',
        phoneNumber: 'phoneNumber',
      };

      const response = await supertest(app).post('/users/addUser').send(user);

      expect(response.statusCode).toBe(400);
    });

    test('should response with 400 status code with missing password', async () => {
      const user = {
        id: 'id',
        name: 'name',
        email: 'email',
        phoneNumber: 'phoneNumber',
      };

      const response = await supertest(app).post('/users/addUser').send(user);

      expect(response.statusCode).toBe(400);
    });

    test('should response with 400 status code with missing phoneNumber', async () => {
      const user = {
        id: 'id',
        name: 'name',
        email: 'email',
        password: 'password',
      };

      const response = await supertest(app).post('/users/addUser').send(user);

      expect(response.statusCode).toBe(400);
    });
  });
});
