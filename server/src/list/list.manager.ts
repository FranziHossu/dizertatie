import {Model} from 'mongoose';
import {IList, listSchema} from './list.model';
import {AbstractManager} from '../util/shared/abstract.manager';

export class ListManager extends AbstractManager {
    private List: Model<IList>;

    protected initModel() {
        this.List = this.connection.model<IList>('List', listSchema);
    }

    public getListsByUser(id: string, success: Function, fail: Function) {
        this.List.find({user: id}).exec(this.replay(success, fail));
    }

    public addList(list: any, success: Function, fail: Function) {
        this.List.create(list, this.replay(success, fail));
    }

    public updateList(list: any, success: Function, fail: Function) {
        this.List.update({_id: list.id}, list, this.replay(success, fail));
    }

    public deleteListById(id: any, success: Function, fail: Function) {
        this.List.remove({_id: id}).exec(this.replay(success, fail));
    }

    public getListsById(id: any, success: Function, fail: Function) {
        this.List.findOne({_id: id}).exec(this.replay(success, fail));
    }
}
