/** Mongoose */
import { Document, Schema } from 'mongoose';
import { IUser } from '../user/user.model';

export const listSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    emails: [String],
    name: String
}, {
        toJSON: {
            transform: function (doc, ret) {
                ret.id = ret._id;

                delete ret._id;
            }
        }
    });

export interface IList extends Document {
    user: IUser;
    emails: [string]
    name: string
}


