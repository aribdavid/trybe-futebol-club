import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';
import { IMatchModel, IMatch, TUpdateGoals } from '../interfaces/IMatch';

export default class MatchRepository implements IMatchModel {
  constructor(private _model = Match) { }

  async getAll(inProgress: boolean | undefined): Promise<IMatch[]> {
    let matches;
    if (inProgress !== undefined) {
      matches = await this._model.findAll({ where: { inProgress },
        include: [
          { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
        ],
      });
    } else {
      matches = await this._model.findAll({
        include: [
          { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
        ],
      });
    }

    return matches as IMatch[];
  }

  async create(data: Omit<Match, 'id' | 'inProgress'>): Promise<Match> {
    const createdMatch = this._model.create(data);
    return createdMatch;
  }

  async updateFinished(id: number): Promise<void> {
    await this._model.update({ inProgress: false }, { where: { id } });
  }

  async updateGoals(id: number, data: TUpdateGoals): Promise<void> {
    await this._model.update(data, { where: { id } });
  }
}