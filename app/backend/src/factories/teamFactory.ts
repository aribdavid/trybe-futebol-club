import TeamController from '../controllers/TeamController';
import TeamRepository from '../repositories/TeamRepository';
import TeamService from '../services/TeamService';

export default () => {
  const model = new TeamRepository();
  const service = new TeamService(model);
  const controller = new TeamController(service);

  return controller;
};