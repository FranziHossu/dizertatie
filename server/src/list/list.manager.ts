import { Model } from 'mongoose';
import { IList, listSchema } from './list.model';
import { AbstractManager } from '../util/shared/abstract.manager';

enum Selectors {
}

export class ListManager extends AbstractManager {
	private List: Model<IList>;

	protected initModel() {
		this.List = this.connection.model<IList>('List', listSchema);
	}


	public getListsByUser(id: string, success: Function, fail: Function) {
		this.List.find({ user: id }).exec(this.replay(success, fail));
	}

}