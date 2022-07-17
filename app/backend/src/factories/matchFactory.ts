import MatchController from '../controllers/MatchController';
import MatchRepository from '../repositories/MatchRepository';
import MatchService from '../services/MatchService';
import TeamRepository from '../repositories/TeamRepository';

export default () => {
  const model = new MatchRepository();
  const teamModel = new TeamRepository();
  const service = new MatchService(model, teamModel);
  const controller = new MatchController(service);

  return controller;
};