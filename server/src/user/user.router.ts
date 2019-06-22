/** Routers */
import { AbstractRouter } from '../util/shared/abstract.router';

/** Models */
import { Request, Response } from 'express';

/** Managers */
import { UserManager } from './user.manager';
import { IUser } from "./user.model";

const bCrypt = require("bcrypt-nodejs");

export class UserRouter extends AbstractRouter {
    private userManager: UserManager = new UserManager();

    protected initRoutes() {
        this.router.get('/api/user/:id', this.getUser.bind(this));
        this.router.get('/api/user/password-token/:token', this.getUserByPasswordToken.bind(this));
        this.router.get('/api/user/password/:id', this.changePassword.bind(this));
        this.router.get('/api/user/confirmation/:token', this.confirmation.bind(this));
        this.router.get('/api/user/token/:token', this.getUserByToken.bind(this));
        this.router.get('/api/users', this.getUsers.bind(this));

        this.router.post('/api/user/login', this.login.bind(this));
        this.router.post('/api/user/register', this.register.bind(this));

        this.router.put('/api/user/:id', this.updateUser.bind(this));
        this.router.put('/api/user/password/:id', this.updateUserPassword.bind(this));

        this.router.delete('/api/user/:id', this.deleteUser.bind(this));
    }

    private login(request: Request, response: Response) {
        this.userManager.findByUsernameAndPassword(request.body, (userDB: any) => {
            if (userDB != null) {
                if (userDB.token !== '') {
                    response.status(400).json('Account not confirmed');
                } else {
                    bCrypt.compare(request.body.password, userDB.password, (err, isMatch) => {
                        if (err) {
                            response.status(500).json(null);
                        } else {
                            if (isMatch) {
                                response.status(200).json(userDB);
                            } else {
                                response.status(500).json(null);
                            }
                        }
                    });
                }
            } else {
                response.status(500).json(null);
            }

        }, (error: Error) => {
            response.status(500).json(null);
        });
    }

    private register(request: Request, response: Response) {
        this.userManager.getUserbyEmail(request.body.email, (data: any) => {
            if (!data) {
                this.userManager.createUser(request.body, (data: any) => {
                    this.emailService.send(data.email, `support@ubbcluj.ro.`,
                        `Confirmation Account`, `http://localhost:4200/confirmation/${data.token}`);

                    response.status(200).json(data);
                }, (error: Error) => {
                    response.status(500).json(null);
                });
            } else {
                response.status(400).json(null);
            }
        }, (error: any) => {
            response.status(500).json(null);
        });

    }

    private updateUser(request: Request, response: Response) {
        this.userManager.updateUser(request.params.id, request.body, (data: any) => {
            response.status(200).json(data);
        }, (error: Error) => {
            response.status(500).json(null);
        });
    }


    private getUsers(request: Request, response: Response) {
        this.userManager.getUsers((data: any) => {
            response.status(200).json(data);
        }, (error: Error) => {
            response.status(500).json(null);
        });
    }

    private updateUserPassword(request: Request, response: Response) {
        request.body.passwordToken = '';
        this.userManager.updateUserPassword(request.params.id, request.body, (data: any) => {
            response.status(200).json(data);
        }, (error: Error) => {
            response.status(500).json(null);
        });
    }

    private changePassword(request: Request, response: Response) {
        this.userManager.changePassword(request.params.id, (data: any) => {
            response.status(200).json(data);
        }, (error: Error) => {
            response.status(500).json(null);
        });
    }


    private deleteUser(request: Request, response: Response) {
        this.userManager.deleteUser(request.params.id, (data: any) => {
            response.status(200).json(data);
        }, (error: Error) => {
            response.status(500).json(null);
        });
    }


    private getUserByToken(request: Request, response: Response) {
        this.userManager.getUserByToken(request.params.token, (data: any) => {
            if (data) {
                response.status(200).json(data);
            } else {
                response.status(500).json(null);
            }
        }, (error: Error) => {
            response.status(500).json(null);
        });
    }


    private confirmation(request: Request, response: Response) {
        this.userManager.getUserByToken(request.params.token, (data: any) => {
            if (data) {
                data.token = '';
                console.log(data);
                this.userManager.updateUser(data._id, data, (data: any) => {
                    response.status(200).json(data);
                }, (error: Error) => {
                    response.status(500).json(null);
                });
            } else {
                response.status(500).json(null);
            }
        }, (error: any) => {
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

    private getUserByPasswordToken(request: Request, response: Response) {
        this.userManager.getUserByPasswordToken(request.params.token, (user: IUser) => {
            response.status(200).json(user);
        }, (error: Error) => {
            response.status(500).json(null);
        });
    }



}
