import * as Express from 'express';
import * as BodyParser from 'body-parser';
import * as Mongoose from 'mongoose';

import { config } from './config';
import { databaseService } from './util/database.service';
import { routerService } from './util/router.service';

class App {
	public app: Express.Application;

	private database: Mongoose.Connection;

	constructor() {
		this.init();
	}

	private init() {
		this.startDatabase();
		this.startServer();
	}

	private startDatabase() {
		this.database = Mongoose.createConnection(config.database.url);
		databaseService.setConnection(this.database);

		this.database.on('connected', () => {
			console.log(`Database started for ${config.database.url}`);
		});
	}

	private startServer() {
		this.app = Express();

		this.app.use(BodyParser.json());
		this.app.use(BodyParser.urlencoded({ extended: false }));
		this.app.use((request, response, next) => {
			response.header('Access-Control-Allow-Origin', "*");
			response.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
			next();
		});
		routerService.setApplication(this.app);

		this.app.listen(config.server, (error) => {
			console.log(`Listening on port ${config.server.port}`);
		});


	}
}

export default new App().app;
