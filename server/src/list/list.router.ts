/** Routers */
import {AbstractRouter} from '../util/shared/abstract.router';

/** Models */
import {Request, Response} from 'express';

/** Managers */
import {ListManager} from './list.manager';

export class ListRouter extends AbstractRouter {
    private listManager: ListManager = new ListManager();

    protected initRoutes() {
        this.router.get('/api/lists/:id', this.getListsByUser.bind(this));
        this.router.get('/api/list/:id', this.getListById.bind(this));

        this.router.post('/api/list', this.addList.bind(this));

        this.router.put('/api/list', this.updateList.bind(this));

        this.router.delete(`/api/list/:id`, this.deleteList.bind(this));
    }

    private getListsByUser(request: Request, response: Response) {
        this.listManager.getListsByUser(request.params.id, (data) => {
            response.status(200).json(data);
        }, () => {
            response.status(500).json(null);
        });
    }

    private addList(request: Request, response: Response) {
        this.listManager.addList(request.body, (result) => {

            response.status(200).json(result);
        }, () => {
            response.status(500);
        });
    }

    private updateList(request: Request, response: Response) {
        this.listManager.updateList(request.body, (result) => {
            response.status(200).json(result);
        }, () => {
            response.status(500);
        });
    }

    private deleteList(request: Request, response: Response) {
        this.listManager.deleteListById(request.params.id, (data: any) => {
            response.status(200).json(data);
        }, () => {
            response.status(500).json(null);
        });
    }

    private getListById(request: Request, response: Response) {
        this.listManager.getListsById(request.params.id, (data: any) => {
            response.status(200).json(data);
        }, (error: Error) => {
            response.status(500);
        });
    }
}
