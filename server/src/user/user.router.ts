/** Routers */
import { AbstractRouter } from '../util/shared/abstract.router';

/** Models */
import { Request, Response } from 'express';

/** Managers */
import { UserManager } from './user.manager';
const bCrypt = require("bcrypt-nodejs");

export class UserRouter extends AbstractRouter {
	private userManager: UserManager = new UserManager();

	protected initRoutes() {
		this.router.get('/api/user/:id', this.getUser.bind(this));

		this.router.post('/api/user/login', this.login.bind(this));
		this.router.post('/api/user/register', this.register.bind(this));
	}

	private login(request: Request, response: Response) {
		this.userManager.findByUsernameAndPassword(request.body, (userDB: any) => {
			if (userDB != null) {
				bCrypt.compare(request.body.password, userDB.password, (err, isMatch) => {
					if (err) {
						response.status(500).json(null);
					}
					else {
						if (isMatch) {
							response.status(200).json(userDB);
						} else {
							response.status(500).json(null);
						}
					}
				});
			} else {
				response.status(500).json(null);
			}
		}, (error: Error) => {
			response.status(500).json(null);
		});
	}

	private register(request: Request, response: Response) {
		this.userManager.createUser(request.body, (data: any) => {
			response.status(200).json(data);
		}, (error: Error) => {
			response.status(500).json(null);
		});
	}


	private getUser(request: Request, response: Response) {
		this.userManager.getUser(request.params.id, (data: any) => {
			response.status(200).json(data);
		}, (error: Error) => {
			response.status(500).json(null);
		});
	}


}