import { TMatchesResultsWithTotals, TMatchesResults } from '../types/matchesResults';
import { IMatchWithTeam } from '../interfaces/IMatch';
import { ILeaderboard } from '../interfaces/ILeaderboard';

const checkResults = (acc: TMatchesResults, teamGoals: number, opponentsGoals: number) => {
  if (teamGoals > opponentsGoals) acc.totalVictories += 1;

  else if (teamGoals < opponentsGoals) acc.totalLosses += 1;

  else acc.totalDraws += 1;

  acc.goalsFavor += teamGoals;
  acc.goalsOwn += opponentsGoals;
  return acc;
};

const getMatches = (teamMatches: IMatchWithTeam[], home: boolean) => {
  if (home) {
    return teamMatches.reduce((acc, { homeTeamGoals, awayTeamGoals }) => (
      checkResults(acc, homeTeamGoals, awayTeamGoals)
    ), { totalVictories: 0, totalDraws: 0, totalLosses: 0, goalsFavor: 0, goalsOwn: 0 });
  }
  return teamMatches.reduce((acc, { awayTeamGoals, homeTeamGoals }) => (
    checkResults(acc, awayTeamGoals, homeTeamGoals)
  ), { totalVictories: 0, totalDraws: 0, totalLosses: 0, goalsFavor: 0, goalsOwn: 0 });
};

export const matchesData = (teamMatches:
IMatchWithTeam[], home: boolean): TMatchesResultsWithTotals => {
  const matches = getMatches(teamMatches, home);
  const totalGames = teamMatches.length;
  const totalPoints = (matches.totalVictories * 3) + matches.totalDraws;

  return ({
    totalPoints,
    totalGames,
    ...matches,
    goalsBalance: matches.goalsFavor - matches.goalsOwn,
    efficiency: Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2)),
  });
};

export const generalLeaderboard = (homeData: TMatchesResultsWithTotals, awayData:
TMatchesResultsWithTotals): TMatchesResultsWithTotals => {
  const homeValues = Object.entries(homeData);
  const awayValues = Object.entries(awayData);
  const finalValues = homeValues.map((entrie, index) => {
    const value = entrie[1] + awayValues[index][1];
    return [entrie[0], value];
  });
  const result = Object.fromEntries(finalValues);

  return ({
    ...result,
    goalsBalance: result.goalsFavor - result.goalsOwn,
    efficiency: Number(((result.totalPoints / (result.totalGames * 3)) * 100).toFixed(2)),
  });
};

export const sortLeaderboard = (a: ILeaderboard, b: ILeaderboard) => {
  let result = b.totalPoints - a.totalPoints;
  if (result === 0) result = b.totalVictories - a.totalVictories;
  if (result === 0) result = b.goalsBalance - a.goalsBalance;
  if (result === 0) result = b.goalsFavor - a.goalsFavor;
  if (result === 0) result = b.goalsOwn - a.goalsOwn;
  return result;
};