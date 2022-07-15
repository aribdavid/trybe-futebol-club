import Team from '../database/models/TeamModel';
import { ITeamModel } from '../interfaces/ITeam';

export default class TeamRepository implements ITeamModel {
  constructor(private _model = Team) { }

  async getAll(): Promise<Team[]> {
    const teams = await this._model.findAll();

    return teams;
  }

  async getById(id: number): Promise<Team | null> {
    const team = await this._model.findByPk(id);

    return team;
  }
}