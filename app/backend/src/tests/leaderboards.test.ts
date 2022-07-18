import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import Team from '../database/models/TeamModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests GET method for /leaderboards', () => {
  describe('if the route requested is /leaderboards/home', () => {
    let chaiHttpResponse: Response;
    const homeLeaderboard = [
      {
        name: 'Santos',
        totalPoints: 9,
        totalGames: 3,
        totalVictories: 3,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 9,
        goalsOwn: 3,
        goalsBalance: 6,
        efficiency: 100
      },
      {
        name: 'Palmeiras',
        totalPoints: 7,
        totalGames: 3,
        totalVictories: 2,
        totalDraws: 1,
        totalLosses: 0,
        goalsFavor: 10,
        goalsOwn: 5,
        goalsBalance: 5,
        efficiency: 77.78
      }
    ]
    const teamsHomeMatches = [
      {
        "id": 12,
        "teamName": "Palmeiras",
        "teamHome": [
          {
            "id": 7,
            "homeTeam": 12,
            "homeTeamGoals": 2,
            "awayTeam": 6,
            "awayTeamGoals": 2,
            "inProgress": false
          },
          {
            "id": 18,
            "homeTeam": 12,
            "homeTeamGoals": 4,
            "awayTeam": 5,
            "awayTeamGoals": 2,
            "inProgress": false
          },
          {
            "id": 40,
            "homeTeam": 12,
            "homeTeamGoals": 4,
            "awayTeam": 8,
            "awayTeamGoals": 1,
            "inProgress": false
          }
        ]
      },
      {
        "id": 14,
        "teamName": "Santos",
        "teamHome": [
          {
            "id": 14,
            "homeTeam": 14,
            "homeTeamGoals": 2,
            "awayTeam": 16,
            "awayTeamGoals": 1,
            "inProgress": false
          },
          {
            "id": 32,
            "homeTeam": 14,
            "homeTeamGoals": 5,
            "awayTeam": 11,
            "awayTeamGoals": 1,
            "inProgress": false
          },
          {
            "id": 38,
            "homeTeam": 14,
            "homeTeamGoals": 2,
            "awayTeam": 4,
            "awayTeamGoals": 1,
            "inProgress": false
          }
        ]
      }
    ]

    before(() => sinon.stub(Team, 'findAll').resolves(teamsHomeMatches as Team[]));

    after(() => (Team.findAll as sinon.SinonStub).restore())

    it('it should return the status code 200', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard/home');

      expect(chaiHttpResponse).to.have.status(200);
    });
    it('the body should return an array', () => {
      expect(chaiHttpResponse.body).to.be.an('array');
    });
    it('the array must contain all the correct info for the home leaderboard', () => {
      expect(chaiHttpResponse.body).to.have.eql(homeLeaderboard);
    });
  });

  describe('if the route requested is /leaderboards/away', () => {
    let chaiHttpResponse: Response;
    const awayLeaderboard = [
      {
        name: 'Palmeiras',
        totalPoints: 6,
        totalGames: 2,
        totalVictories: 2,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 7,
        goalsOwn: 0,
        goalsBalance: 7,
        efficiency: 100
      },
      {
        name: 'Corinthians',
        totalPoints: 6,
        totalGames: 3,
        totalVictories: 2,
        totalDraws: 0,
        totalLosses: 1,
        goalsFavor: 6,
        goalsOwn: 2,
        goalsBalance: 4,
        efficiency: 66.67
      }
    ]
    const teamsAwayMatches = [
      {
        "id": 12,
        "teamName": "Palmeiras",
        "teamAway": [
          {
            "id": 9,
            "homeTeam": 1,
            "homeTeamGoals": 0,
            "awayTeam": 12,
            "awayTeamGoals": 3,
            "inProgress": false
          },
          {
            "id": 30,
            "homeTeam": 3,
            "homeTeamGoals": 0,
            "awayTeam": 12,
            "awayTeamGoals": 4,
            "inProgress": false
          }
        ]
      },
      {
        "id": 4,
        "teamName": "Corinthians",
        "teamAway": [
          {
            "id": 12,
            "homeTeam": 6,
            "homeTeamGoals": 0,
            "awayTeam": 4,
            "awayTeamGoals": 1,
            "inProgress": false
          },
          {
            "id": 29,
            "homeTeam": 9,
            "homeTeamGoals": 0,
            "awayTeam": 4,
            "awayTeamGoals": 4,
            "inProgress": false
          },
          {
            "id": 38,
            "homeTeam": 14,
            "homeTeamGoals": 2,
            "awayTeam": 4,
            "awayTeamGoals": 1,
            "inProgress": false
          }
        ]
      },
    ]

    before(() => sinon.stub(Team, 'findAll').resolves(teamsAwayMatches as Team[]));

    after(() => (Team.findAll as sinon.SinonStub).restore())

    it('it should return the status code 200', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard/away');

      expect(chaiHttpResponse).to.have.status(200);
    });
    it('the body should return an array', () => {
      expect(chaiHttpResponse.body).to.be.an('array');
    });
    it('the array must contain all the correct info for the away leaderboard', () => {
      expect(chaiHttpResponse.body).to.have.eql(awayLeaderboard);
    });
  });

  describe('if the route requested is /leaderboards', () => {
    let chaiHttpResponse: Response;
    const leaderboard = [
      {
        name: 'Palmeiras',
        totalPoints: 13,
        totalGames: 5,
        totalVictories: 4,
        totalDraws: 1,
        totalLosses: 0,
        goalsFavor: 17,
        goalsOwn: 5,
        goalsBalance: 12,
        efficiency: 86.67,
      },
      {
        name: 'Corinthians',
        totalPoints: 12,
        totalGames: 5,
        totalVictories: 4,
        totalDraws: 0,
        totalLosses: 1,
        goalsFavor: 12,
        goalsOwn: 3,
        goalsBalance: 9,
        efficiency: 80,
      },
    ]
    const allMatches = [
      {
        "id": 12,
        "teamName": "Palmeiras",
        "teamHome": [
          {
            "id": 40,
            "homeTeam": 12,
            "homeTeamGoals": 4,
            "awayTeam": 8,
            "awayTeamGoals": 1,
            "inProgress": false
          },
          {
            "id": 18,
            "homeTeam": 12,
            "homeTeamGoals": 4,
            "awayTeam": 5,
            "awayTeamGoals": 2,
            "inProgress": false
          },
          {
            "id": 7,
            "homeTeam": 12,
            "homeTeamGoals": 2,
            "awayTeam": 6,
            "awayTeamGoals": 2,
            "inProgress": false
          }
        ],
        "teamAway": [
          {
            "id": 9,
            "homeTeam": 1,
            "homeTeamGoals": 0,
            "awayTeam": 12,
            "awayTeamGoals": 3,
            "inProgress": false
          },
          {
            "id": 30,
            "homeTeam": 3,
            "homeTeamGoals": 0,
            "awayTeam": 12,
            "awayTeamGoals": 4,
            "inProgress": false
          }
        ]
      },
      {
        "id": 4,
        "teamName": "Corinthians",
        "teamHome": [
          {
            "id": 22,
            "homeTeam": 4,
            "homeTeamGoals": 3,
            "awayTeam": 3,
            "awayTeamGoals": 1,
            "inProgress": false
          },
          {
            "id": 3,
            "homeTeam": 4,
            "homeTeamGoals": 3,
            "awayTeam": 11,
            "awayTeamGoals": 0,
            "inProgress": false
          }
        ],
        "teamAway": [
          {
            "id": 12,
            "homeTeam": 6,
            "homeTeamGoals": 0,
            "awayTeam": 4,
            "awayTeamGoals": 1,
            "inProgress": false
          },
          {
            "id": 29,
            "homeTeam": 9,
            "homeTeamGoals": 0,
            "awayTeam": 4,
            "awayTeamGoals": 4,
            "inProgress": false
          },
          {
            "id": 38,
            "homeTeam": 14,
            "homeTeamGoals": 2,
            "awayTeam": 4,
            "awayTeamGoals": 1,
            "inProgress": false
          }
        ]
      },
    ]

    before(() => sinon.stub(Team, 'findAll').resolves(allMatches as Team[]));

    after(() => (Team.findAll as sinon.SinonStub).restore())

    it('it should return the status code 200', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard');

      expect(chaiHttpResponse).to.have.status(200);
    });
    it('the body should return an array', () => {
      expect(chaiHttpResponse.body).to.be.an('array');
    });
    it('the array must contain all the correct info for the general leaderboard', () => {
      expect(chaiHttpResponse.body).to.have.eql(leaderboard);
    });
  });
});
