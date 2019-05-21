/** Routers */
import { AbstractRouter } from '../util/shared/abstract.router';

/** Models */
import { Request, Response } from 'express';

/** Managers */
import { DataManager } from './data.manager';

export class DataRouter extends AbstractRouter {
	private dataManager: DataManager = new DataManager();

	protected initRoutes() {
		this.router.get('/api/data', this.getData.bind(this));
	}

	private getData(request: Request, response: Response) {
		this.dataManager.getData((data) => {
			response.status(200).json(data);
		}, () => {
			response.status(500).json(null);
		});
	}



}
