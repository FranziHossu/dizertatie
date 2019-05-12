import { Model } from 'mongoose';
import { IData, dataSchema } from './data.model';
import { AbstractManager } from '../util/shared/abstract.manager';

enum Selectors {
}

export class DataManager extends AbstractManager {
	private Data: Model<IData>;

	protected initModel() {
		this.Data = this.connection.model<IData>('Data', dataSchema);
	}

	public getData(success: Function, fail: Function) {
		this.Data.find({}).exec(this.replay(success, fail));
	}
}