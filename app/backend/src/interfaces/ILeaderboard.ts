export interface ILeaderboard {
  name: Array<string>
  totalPoints: number
  totalGames: number
  totalVictories: number
  totalDraws: number
  totalLosses: number
  goalsFavor: number
  goalsOwn: number
  goalsBalance: number
  efficiency: number
}

export interface ILeaderboardModel {
  getHomeTeam(): Promise<ILeaderboard[]>
  getAwayTeam(): Promise<ILeaderboard[]>
  getAll(): Promise<ILeaderboard[]>
}

export interface ILeaderboardService {
  getHomeTeam(): Promise<ILeaderboard[]>
  getAwayTeam(): Promise<ILeaderboard[]>
  getAll(): Promise<ILeaderboard[]>
}