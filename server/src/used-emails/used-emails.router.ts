/** Routers */
import {AbstractRouter} from '../util/shared/abstract.router';

/** Models */
import {Request, Response} from 'express';

/** Managers */
import {EmailManager} from './email.manager';


export class EmailRouter extends AbstractRouter {
    private mailManager: EmailManager = new EmailManager();

    protected initRoutes() {
        this.router.post(`/api/email`, this.sendEmail.bind(this));

    }

    private sendEmail(request: Request, response: Response) {
        this.mailManager.sendEmail(request.body, (value) => {
            response.status(200).json(value);
        }, () => {
            response.status(500).json(false);
        });
    }
}
