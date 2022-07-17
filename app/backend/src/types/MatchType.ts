import { ILeaderboard } from '../interfaces/ILeaderboard';

export type TMatchesResultsWithTotals = Omit<ILeaderboard, 'name'>;

export type TMatchesResults = Omit<TMatchesResultsWithTotals,
'totalPoints' | 'totalGames' | 'goalsBalance' | 'efficiency'>;