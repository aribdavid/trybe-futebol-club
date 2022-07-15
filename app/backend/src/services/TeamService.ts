import { ITeamService, ITeamModel } from '../interfaces/ITeam';
import Team from '../database/models/TeamModel';

export default class TeamService implements ITeamService {
  constructor(private _model: ITeamModel) {}

  async getAll(): Promise<Team[]> {
    const teams = await this._model.getAll();

    return teams;
  }

  async getById(id: number): Promise<Team | null> {
    const team = await this._model.getById(id);

    return team;
  }
}