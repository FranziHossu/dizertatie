/** Mongoose */
import {Document, Schema} from 'mongoose';

export const usedEmailsSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    email: String,
}, {
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;

            delete ret._id;
        }
    }
});

export interface IUsedEmail extends Document {
    user: string;
    email: string;
}


