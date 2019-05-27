/** Routers */
import {AbstractRouter} from '../util/shared/abstract.router';

/** Models */
import {Request, Response} from 'express';

/** Managers */
import {UsedEmailsManager} from './used-emails.manager';


export class UsedEmailsRouter extends AbstractRouter {
    private usedEmailsManager: UsedEmailsManager = new UsedEmailsManager();

    protected initRoutes() {
        this.router.get(`/api/emails/user/:id`, this.getEmailsByUserId.bind(this));
    }

    private getEmailsByUserId(request: Request, response: Response) {
        this.usedEmailsManager.getEmailsByUserId(request.params.id, (data) => {
            response.status(200).json(data);
        }, () => {
            response.status(500).json(null);
        })
    }

}
