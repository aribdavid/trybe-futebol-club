import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { IMatch } from '../interfaces/IMatch';
import { Response } from 'superagent';
import Match from '../database/models/MatchModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests GET method for /matches', () => {
  describe('if the request is successful', () => {
    let chaiHttpResponse: Response;
    const matches = [
      {
        "id": 1,
        "homeTeam": 16,
        "homeTeamGoals": 1,
        "awayTeam": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
          "teamName": "São Paulo"
        },
        "teamAway": {
          "teamName": "Grêmio"
        }
      },
      {
        "id": 41,
        "homeTeam": 16,
        "homeTeamGoals": 2,
        "awayTeam": 9,
        "awayTeamGoals": 0,
        "inProgress": true,
        "teamHome": {
          "teamName": "São Paulo"
        },
        "teamAway": {
          "teamName": "Internacional"
        }
      }
    ]

    before(() => sinon.stub(Match, 'findAll').resolves(matches as IMatch[]));

    after(() => (Match.findAll as sinon.SinonStub).restore())

    it('it should return the status code 200', async () => {
      chaiHttpResponse = await chai.request(app).get('/matches');

      expect(chaiHttpResponse).to.have.status(200);
    });
    it('the body should return an array', () => {
      expect(chaiHttpResponse.body).to.be.an('array');
    });
    it('the array must contain all matches in the DB', () => {
      expect(chaiHttpResponse.body).to.have.length(2);
    });
  });

  describe('if the request is made with a filter for ongoing matches', () => {
    let chaiHttpResponse: Response;
    const ongoingMatches = [
      {
        "id": 41,
        "homeTeam": 16,
        "homeTeamGoals": 2,
        "awayTeam": 9,
        "awayTeamGoals": 0,
        "inProgress": true,
        "teamHome": {
          "teamName": "São Paulo"
        },
        "teamAway": {
          "teamName": "Internacional"
        }
      },
      {
        "id": 42,
        "homeTeam": 6,
        "homeTeamGoals": 1,
        "awayTeam": 1,
        "awayTeamGoals": 0,
        "inProgress": true,
        "teamHome": {
          "teamName": "Ferroviária"
        },
        "teamAway": {
          "teamName": "Avaí/Kindermann"
        }
      }
    ]

    before(() => sinon.stub(Match, 'findAll').resolves(ongoingMatches as IMatch[]));

    after(() => (Match.findAll as sinon.SinonStub).restore())

    it('it should return the status code 200', async () => {
      chaiHttpResponse = await chai.request(app).get('/matches')
        .query({ inProgress: true });

      expect(chaiHttpResponse).to.have.status(200);
    });
    it('the body should return an array', () => {
      expect(chaiHttpResponse.body).to.be.an('array');
    });
    it('the array must contain only the ongoing matches', () => {
      chaiHttpResponse.body.forEach((match: IMatch) => {
        expect(match.inProgress).to.be.true;
      });
    });
  });

  describe('if the request is made with a filter for ended matches', () => {
    let chaiHttpResponse: Response;
    const endedMatches = [
      {
        "id": 1,
        "homeTeam": 16,
        "homeTeamGoals": 1,
        "awayTeam": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
          "teamName": "São Paulo"
        },
        "teamAway": {
          "teamName": "Grêmio"
        }
      },
      {
        "id": 2,
        "homeTeam": 9,
        "homeTeamGoals": 1,
        "awayTeam": 14,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
          "teamName": "Internacional"
        },
        "teamAway": {
          "teamName": "Santos"
        }
      }
    ]

    before(() => sinon.stub(Match, 'findAll').resolves(endedMatches as IMatch[]));

    after(() => (Match.findAll as sinon.SinonStub).restore())

    it('it should return the status code 200', async () => {
      chaiHttpResponse = await chai.request(app).get('/matches')
        .query({ inProgress: false });

      expect(chaiHttpResponse).to.have.status(200);
    });
    it('the body should return an array', () => {
      expect(chaiHttpResponse.body).to.be.an('array');
    });
    it('the array must contain only the ended matches', () => {
      chaiHttpResponse.body.forEach((match: IMatch) => {
        expect(match.inProgress).to.be.false;
      });
    });
  });
});