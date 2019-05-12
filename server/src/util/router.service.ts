import * as Multer from 'multer';
import { Application } from 'express';

/** Routers */
import { UserRouter } from '../user/user.router';
import { DataRouter } from '../data/data.router';


class RouterService {
	private app: Application;
	private storage: Multer.Instance;

	public setApplication(app: Application) {
		this.app = app;
		this.initRouters();
	}

	private initRouters() {
		new UserRouter(this.app);
		new DataRouter(this.app);
	}
}

export const routerService: RouterService = new RouterService();