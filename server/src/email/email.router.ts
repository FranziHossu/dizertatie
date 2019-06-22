/** Routers */
import {AbstractRouter} from '../util/shared/abstract.router';

/** Models */
import {Request, Response} from 'express';

/** Managers */
import {EmailManager} from './email.manager';
import {UsedEmailsManager} from "../used-emails/used-emails.manager";

export class EmailRouter extends AbstractRouter {
    private mailManager: EmailManager = new EmailManager();
    private usedEmailsManager: UsedEmailsManager = new UsedEmailsManager();

    protected initRoutes() {
        this.router.post(`/api/email`, this.sendEmail.bind(this));

        this.router.get(`/api/complete-emails/user/:id`, this.getEmails.bind(this));
        this.router.get(`/api/email/:id`, this.getEmail.bind(this));
        this.router.get(`/api/emails/:userId`, this.getUserNumberEmails.bind(this));
        this.router.get(`/api/emails/admin`, this.getEmailsNumber.bind(this));

        this.router.delete(`/api/email/:id`, this.deleteEmail.bind(this));
    }

    private sendEmail(request: Request, response: Response) {
        this.mailManager.sendEmail(request.body, (value) => {
            this.usedEmailsManager.getEmailsByUserId(request.body.fromId, (arr: any) => {
                let array: Array<any> = new Array<any>();

                for (let i = 0; i < request.body.to.length; i++) {
                    let found = false;
                    for (let j = 0; j < arr.length; j++) {
                        if (arr[j].email === request.body.to[i]) {
                            found = true;
                        }
                    }
                    if (!found) {
                        array.push({
                            user: request.body.fromId,
                            email: request.body.to[i]
                        });
                    }
                }
                this.usedEmailsManager.saveMany(array, () => {
                    this.mailManager.saveEmail(request.body, (data: any) => {
                        response.status(200).json(value);

                    }, (error) => {
                        response.status(500).json(false);
                    });
                }, () => {
                    response.status(500).json(false);
                })
            }, () => {
                response.status(500).json(false);
            });
        }, () => {
            response.status(500).json(false);
        });
    }

    private getEmails(request: Request, response: Response) {
        this.mailManager.getEmailsByUser(request.params.id, (data: any) => {
            response.status(200).json(data);
        }, () => {
            response.status(500).json(null);
        })
    }

    private deleteEmail(request: Request, response: Response) {
        this.mailManager.deleteEmail(request.params.id, (data: any) => {
            response.status(200).json(data);
        }, () => {
            response.status(500).json(null);
        })
    }

    private getEmail(request: Request, response: Response) {
        this.mailManager.getEmail(request.params.id, (data: any) => {
            response.status(200).json(data);
        }, () => {
            response.status(500).json(null);
        })
    }

    private getUserNumberEmails(request: Request, response: Response) {
        this.mailManager.getUserNumberEmails(request.params.id, (data: any) => {
            response.status(200).json(data);
        }, () => {
            response.status(500).json(null);
        })
    }
    
    private getEmailsNumber(request: Request, response: Response) {
        this.mailManager.getEmailsNumber((data: any) => {
            response.status(200).json(data);
        }, () => {
            response.status(500).json(null);
        })
    }
}
