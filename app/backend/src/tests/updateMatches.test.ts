import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests PATCH method for /matches', () => {
  describe('if the request is made on /matches/:id/finish', () => {
    let chaiHttpResponse: Response;

    it('it should return the status code 200', async () => {
      chaiHttpResponse = await chai.request(app).patch('/matches/1/finish');

      expect(chaiHttpResponse).to.have.status(200);
    });
    it('the body should return an object', () => {
      expect(chaiHttpResponse.body).to.be.an('object');
    });
    it('the object must contain the key "message" with the value "Finished"', () => {
      expect(chaiHttpResponse.body).to.have.key('message');
      expect(chaiHttpResponse.body.message).to.be.equal('Finished');
    });
  });

  describe('if the request is made on /matches/:id', () => {
    let chaiHttpResponse: Response;
    const insertedData = {
      "homeTeamGoals": 3,
      "awayTeamGoals": 1
    }

    it('it should return the status code 200', async () => {
      chaiHttpResponse = await chai.request(app).patch('/matches/1')
        .send(insertedData);

      expect(chaiHttpResponse).to.have.status(200);
    });
    it('the body should return an object', () => {
      expect(chaiHttpResponse.body).to.be.an('object');
    });
    it('the object must contain the key "message" with the value "Updated"', () => {
      expect(chaiHttpResponse.body).to.have.key('message');
      expect(chaiHttpResponse.body.message).to.be.equal('Updated');
    });
  });
});