import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import Match from '../database/models/MatchModel';
import User from '../database/models/UserModel';
import Team from '../database/models/TeamModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests POST method for /matches', () => {
  describe('if the request is made with a invalid token', () => {
    let chaiHttpResponse: Response;

    it('it should return the status code 401', async () => {
      const token = 'invalidToken'
      chaiHttpResponse = await chai.request(app)
        .post('/matches').set('authorization', token).send({ data: 'anyData' });

      expect(chaiHttpResponse).to.have.status(401);
    });
    it('the body should return an object', () => {
      expect(chaiHttpResponse.body).to.be.an('object');
    });
    it('the object must contain the key "message" with an error message', () => {
      expect(chaiHttpResponse.body).to.have.key('message');
      expect(chaiHttpResponse.body.message).to.be
        .equal('Token must be a valid token');
    });
  });

  const userLogin = {
    email: 'test@example.com',
    password: 'secret_admin'
  }
  const userInfo = {
    id: 999,
    username: 'John',
    role: 'manager',
    email: 'test@example.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  }

  before(() => sinon.stub(User, 'findOne').resolves(userInfo as User));

  after(() => (User.findOne as sinon.SinonStub).restore());

  describe('if the same team is passed as the home and away team', () => {
    let chaiHttpResponse: Response;
    const insertedData = {
      "homeTeam": 8,
      "awayTeam": 8,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2
    }

    it('it should return the status code 401', async () => {
      const { body: { token } } = await chai.request(app).post('/login').send(userLogin);
      chaiHttpResponse = await chai.request(app)
        .post('/matches').set('authorization', token).send(insertedData);

      expect(chaiHttpResponse).to.have.status(401);
    });
    it('the body should return an object', () => {
      expect(chaiHttpResponse.body).to.be.an('object');
    });
    it('the object must contain the key "message" with an error message', () => {
      expect(chaiHttpResponse.body).to.have.key('message');
      expect(chaiHttpResponse.body.message).to.be
        .equal('It is not possible to create a match with two equal teams');
    });
  });

  describe('if it\'s passed a team that is not on the Team database', () => {
    let chaiHttpResponse: Response;
    const insertedData = {
      "homeTeam": 999,
      "awayTeam": 8,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2
    }

    before(() => sinon.stub(Team, 'findByPk').resolves(null))

    after(() => (Team.findByPk as sinon.SinonStub).restore())

    it('it should return the status code 404', async () => {
      const { body: { token } } = await chai.request(app).post('/login').send(userLogin);
      chaiHttpResponse = await chai.request(app)
        .post('/matches').set('authorization', token).send(insertedData);

      expect(chaiHttpResponse).to.have.status(404);
    });
    it('the body should return an object', () => {
      expect(chaiHttpResponse.body).to.be.an('object');
    });
    it('the object must contain the key "message" with an error message', () => {
      expect(chaiHttpResponse.body).to.have.key('message');
      expect(chaiHttpResponse.body.message).to.be
        .equal('There is no team with such id!');
    });
  });

  describe('if the request is successful', () => {
    let chaiHttpResponse: Response;
    const insertedData = {
      "homeTeam": 16,
      "awayTeam": 8,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2
    }
    const returnedData = {
      "id": 1,
      "homeTeam": 16,
      "homeTeamGoals": 2,
      "awayTeam": 8,
      "awayTeamGoals": 2,
      "inProgress": true
    }
    const returnedTeam = {
      "id": 1,
      "teamName": 'Vitória'
    }

    before(() => {
      sinon.stub(Team, 'findByPk').resolves(returnedTeam as Team);
      sinon.stub(Match, 'create').resolves(returnedData as Match);
    })

    after(() => {
      (Team.findByPk as sinon.SinonStub).restore();
      (Match.create as sinon.SinonStub).restore();
    })

    it('it should return the status code 201', async () => {
      const { body: { token } } = await chai.request(app).post('/login').send(userLogin);

      chaiHttpResponse = await chai.request(app)
        .post('/matches').set('authorization', token).send(insertedData);

      expect(chaiHttpResponse).to.have.status(201);
    });
    it('the body should return an object', () => {
      expect(chaiHttpResponse.body).to.be.an('object');
    });
    it('the object must contain all data from the match', () => {
      expect(chaiHttpResponse.body).to.have
        .keys('id', 'homeTeam', 'homeTeamGoals', 'awayTeam', 'awayTeamGoals', 'inProgress');
    });
  });
});