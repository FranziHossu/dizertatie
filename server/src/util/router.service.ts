import * as Multer from 'multer';
import { Application } from 'express';

/** Routers */
import { UserRouter } from '../user/user.router';
import { ListRouter } from '../list/list.router';
import {EmailRouter} from "../email/email.router";
import {UsedEmailsRouter} from "../used-emails/used-emails.router";
import {NotificationRouter} from "../notification/notification.router";


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
		new EmailRouter(this.app);
		new UsedEmailsRouter(this.app);
		new NotificationRouter(this.app);
	}
}

export const routerService: RouterService = new RouterService();
