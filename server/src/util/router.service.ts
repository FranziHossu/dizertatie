import * as Multer from 'multer';
import { Application } from 'express';

/** Routers */
import { UserRouter } from '../user/user.router';
import { ListRouter } from '../list/list.router';


class RouterService {
	private app: Application;
	private storage: Multer.Instance;

	public setApplication(app: Application) {
		this.app = app;
		this.initRouters();
	}

	private initRouters() {
		new UserRouter(this.app);
		new ListRouter(this.app);
	}
}

export const routerService: RouterService = new RouterService();