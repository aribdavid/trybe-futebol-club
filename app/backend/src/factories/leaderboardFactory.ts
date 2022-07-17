import LeaderboardController from '../controllers/LeaderboardController';
import LeaderboardRepository from '../repositories/LeaderboardRepository';
import LeaderboardService from '../services/LeaderboardService';

export default () => {
  const model = new LeaderboardRepository();
  const service = new LeaderboardService(model);
  const controller = new LeaderboardController(service);

  return controller;
};