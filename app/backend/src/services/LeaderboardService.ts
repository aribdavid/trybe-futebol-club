import { ILeaderboard,
  ILeaderboardModel, ILeaderboardService } from '../interfaces/ILeaderboard';

export default class LeaderboardService implements ILeaderboardService {
  constructor(private _model: ILeaderboardModel) {}

  async getHomeTeam(): Promise<ILeaderboard[]> {
    const leaderboard = await this._model.getHomeTeam();
    return leaderboard;
  }

  async getAwayTeam(): Promise<ILeaderboard[]> {
    const leaderboard = await this._model.getAwayTeam();
    return leaderboard;
  }

  async getAll(): Promise<ILeaderboard[]> {
    const leaderboard = await this._model.getAll();
    return leaderboard;
  }
}