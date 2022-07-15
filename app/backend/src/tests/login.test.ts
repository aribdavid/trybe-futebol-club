import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/UserModel';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests POST method for /login', () => {
  describe('if the request is made with a invalid email', () => {
    let chaiHttpResponse: Response;

    it('it should return the status code 400', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: "wd.oxwxw@dxw@flibs.com",
        password: "177100"
      });

      expect(chaiHttpResponse).to.have.status(400);
    });
    it('the body should return an object', () => {
      expect(chaiHttpResponse.body).to.be.an('object');
    });
    it('the object must have the key "message"', () => {
      expect(chaiHttpResponse.body).to.have.key('message');
    });
    it('"message" should have the error message "All fields must be filled"', () => {
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
    });
  });

  describe('if the request is made with a invalid password', () => {
    let chaiHttpResponse: Response;

    it('it should return the status code 400', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: "test@example.com",
        password: "1234"
      });

      expect(chaiHttpResponse).to.have.status(400);
    });
    it('the body should return an object', () => {
      expect(chaiHttpResponse.body).to.be.an('object');
    });
    it('the object must have the key "message"', () => {
      expect(chaiHttpResponse.body).to.have.key('message');
    });
    it('"message" should have the error message "All fields must be filled"', () => {
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
    });
  });

  describe('if the email isn\'t registered', () => {
    let chaiHttpResponse: Response;

    before(() => {
      sinon
        .stub(User, 'findOne').resolves(null);
    });

    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })

    it('it should return the status code 401', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: "test@test.com",
        password: "123775321"
      });

      expect(chaiHttpResponse).to.have.status(401);
    });
    it('the body should return an object', () => {
      expect(chaiHttpResponse.body).to.be.an('object');
    });
    it('the object must have the key "message"', () => {
      expect(chaiHttpResponse.body).to.have.key('message');
    });
    it('"message" should have the error message "Incorrect email or password"', () => {
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
    });
  });

  describe('if the password is incorrect', () => {
    let chaiHttpResponse: Response;

    before(() => {
      sinon
        .stub(User, 'findOne').resolves(null);
    });

    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })

    it('it should return the status code 401', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: "test@example.com",
        password: "invalidPassword"
      });

      expect(chaiHttpResponse).to.have.status(401);
    });
    it('the body should return an object', () => {
      expect(chaiHttpResponse.body).to.be.an('object');
    });
    it('the object must have the key "message"', () => {
      expect(chaiHttpResponse.body).to.have.key('message');
    });
    it('"message" should have the error message "Incorrect email or password"', () => {
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
    });
  });

  describe('if the request is resolved with success', () => {
    let chaiHttpResponse: Response;
    const userInfo = {
      id: 999,
      username: 'John',
      role: 'manager',
      email: 'test@example.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
    }
    const loginUser = {
      email: 'test@example.com',
      password: 'secret_admin'
    }

    before(() => {
      sinon
        .stub(User, 'findOne').resolves(userInfo as User);
    });

    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })

    it('it should return the status code 200', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(loginUser);

      expect(chaiHttpResponse).to.have.status(200);
    });
    it('the body should return an object', () => {
      expect(chaiHttpResponse.body).to.be.an('object');
    });
    it('the object must have the key "token"', () => {
      expect(chaiHttpResponse.body).to.have.key('token');
    });
  });
});
