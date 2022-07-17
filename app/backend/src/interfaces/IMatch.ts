import Match from '../database/models/MatchModel';

export interface IMatch extends Match {
  teamHome: {
    teamName: string
  },
  teamAway: {
    teamName: string
  }
}

export type TUpdateGoals = Omit<Match, 'id' | 'inProgress' | 'homeTeam' | 'awayTeam'>;

export interface IMatchWithTeam {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IMatchModel {
  getAll(inProgress: boolean | undefined): Promise<IMatch[]>
  create(data: Omit<Match, 'id' | 'inProgress'>): Promise<Match>
  updateToFinished(id: number): Promise<void>
  updateGoals(id:number, data: TUpdateGoals): Promise<void>
}

export interface IMatchService {
  getAll(query: boolean | undefined): Promise<IMatch[]>
  create(data: Omit<Match, 'id' | 'inProgress'>): Promise<Match>
  updateToFinished(id: number): Promise<void>
  updateGoals(id:number, data: TUpdateGoals): Promise<void>
}