import { Request, Response } from 'express';
import { ILeaderboardService } from '../interfaces/ILeaderboard';

export default class LeaderboardController {
  constructor(private _service: ILeaderboardService) {}

  async getHomeTeam(_req: Request, res: Response) {
    const leaderboard = await this._service.getHomeTeam();
    return res.status(200).json(leaderboard);
  }

  async getAwayTeam(_req: Request, res: Response) {
    const leaderboard = await this._service.getAwayTeam();
    return res.status(200).json(leaderboard);
  }

  async getAll(_req: Request, res: Response) {
    const leaderboard = await this._service.getAll();
    return res.status(200).json(leaderboard);
  }
}