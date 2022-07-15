import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamModel';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests GET method for /teams', () => {
  describe('if the request is successful', () => {
    let chaiHttpResponse: Response;
    const teams = [
      {
        "id": 1,
        "teamName": "Avaí/Kindermann"
      },
      {
        "id": 2,
        "teamName": "Bahia"
      },
      {
        "id": 3,
        "teamName": "Botafogo"
      },
    ]

    before(() => sinon.stub(Team, 'findAll').resolves(teams as Team[]));

    after(() => (Team.findAll as sinon.SinonStub).restore())

    it('it should return the status code 200', async () => {
      chaiHttpResponse = await chai.request(app).get('/teams');

      expect(chaiHttpResponse).to.have.status(200);
    });
    it('the body should return an array', () => {
      expect(chaiHttpResponse.body).to.be.an('array');
    });
    it('the array must contain all teams in the DB', () => {
      expect(chaiHttpResponse.body).to.have.length(3);
    });
  });

  describe('if the request is made on /teams/:id', () => {
    let chaiHttpResponse: Response;
    const team = {
      "id": 5,
      "teamName": "Cruzeiro"
    }

    before(() => sinon.stub(Team, 'findByPk').resolves(team as Team));

    after(() => (Team.findByPk as sinon.SinonStub).restore())

    it('it should return the status code 200', async () => {
      chaiHttpResponse = await chai.request(app).get('/teams/5');

      expect(chaiHttpResponse).to.have.status(200);
    });
    it('the body should return only one team', () => {
      expect(chaiHttpResponse.body).to.be.an('object');
    });
    it('the object must contain the keys "id" and "teamName"', () => {
      expect(chaiHttpResponse.body).to.have.keys('id', 'teamName');
    });
  });
});