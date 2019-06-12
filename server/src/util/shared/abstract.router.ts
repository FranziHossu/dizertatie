import { Router } from 'express';
import * as Multer from 'multer';
import {MailService} from "./mail.service";

export abstract class AbstractRouter {
	protected router: Router;
	public emailService: MailService = new MailService();

	constructor(router: Router) {
		this.router = router;
		this.initRoutes();
	}

	protected abstract initRoutes();
}
