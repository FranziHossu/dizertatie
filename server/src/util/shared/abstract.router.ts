import { Router } from 'express';
import * as Multer from 'multer';

export abstract class AbstractRouter {
	protected router: Router;
	protected storage: Multer.Instance;

	constructor(router: Router) {
		this.router = router;
		this.initRoutes();
	}

	protected abstract initRoutes();
}