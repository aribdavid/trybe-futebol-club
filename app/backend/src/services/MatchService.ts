import { StatusCodes } from 'http-status-codes';
import { ITeamModel } from '../interfaces/ITeam';
import Match from '../database/models/MatchModel';
import {
  IMatchModel,
  IMatchService,
  IMatch,
  TUpdateGoals } from '../interfaces/IMatch';
import ErrorHandler from '../utils/ErrorHandler';

export default class MatchService implements IMatchService {
  constructor(private _model: IMatchModel, private _teamModel: ITeamModel) { }

  async getAll(query: boolean | undefined): Promise<IMatch[]> {
    const matches = await this._model.getAll(query);

    return matches;
  }

  async create(data: Omit<Match, 'id' | 'inProgress'>): Promise<Match> {
    const homeTeam = await this._teamModel.getById(data.homeTeam);
    const awayTeam = await this._teamModel.getById(data.awayTeam);
    if (!homeTeam || !awayTeam) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, 'There is no team with such id!');
    }

    const createdMatch = await this._model.create(data);
    return createdMatch;
  }

  async updateToFinished(id: number): Promise<void> {
    await this._model.updateToFinished(id);
  }

  async updateGoals(id: number, data: TUpdateGoals): Promise<void> {
    await this._model.updateGoals(id, data);
  }
}