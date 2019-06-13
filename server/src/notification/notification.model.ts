/** Mongoose */
import {Document, Schema} from 'mongoose';
import {IUser} from "../user/user.model";

export const notificationSchema: Schema = new Schema({
    text: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    target: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    time: Date
}, {
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;

            delete ret._id;
        }
    }
});

export interface INotification extends Document {
    text: string,
    author: IUser,
    target: IUser,
    time: Date
}


