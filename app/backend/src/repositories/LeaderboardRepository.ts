import { generalLeaderboard, matchesData, sortLeaderboard } from '../utils/MatchHandler';
import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';
import { ILeaderboard, ILeaderboardModel } from '../interfaces/ILeaderboard';

export default class LeaderboardRepository implements ILeaderboardModel {
  constructor(private _teamModel = Team) {}

  async getHomeTeam(): Promise<ILeaderboard[]> {
    const teamsAndMatches = await this._teamModel.findAll({
      include: [
        { model: Match, as: 'teamHome', where: { inProgress: false } },
      ],
    });

    const leaderboard = teamsAndMatches.map(({ teamName, teamHome }) => ({
      name: teamName,
      ...matchesData(teamHome, true),
    }));

    return leaderboard.sort((a, b) => sortLeaderboard(a, b));
  }

  async getAwayTeam(): Promise<ILeaderboard[]> {
    const teamsAndMatches = await this._teamModel.findAll({
      include: [
        { model: Match, as: 'teamAway', where: { inProgress: false } },
      ],
    });

    const leaderboard = teamsAndMatches.map(({ teamName, teamAway }) => ({
      name: teamName,
      ...matchesData(teamAway, false),
    }));

    return leaderboard.sort((a, b) => sortLeaderboard(a, b));
  }

  async getAll(): Promise<ILeaderboard[]> {
    const teamsAndMatches = await this._teamModel.findAll({
      include: [
        { model: Match, as: 'teamHome', where: { inProgress: false } },
        { model: Match, as: 'teamAway', where: { inProgress: false } },
      ],
    });

    const leaderboard = teamsAndMatches.map(({ teamName, teamHome, teamAway }) => ({
      name: teamName,
      ...generalLeaderboard(matchesData(teamHome, true), matchesData(teamAway, false)),
    }));

    return leaderboard.sort((a, b) => sortLeaderboard(a, b));
  }
}