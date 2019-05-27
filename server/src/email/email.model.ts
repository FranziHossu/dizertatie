/** Mongoose */
import {Document, Schema} from 'mongoose';

export const emailSchema: Schema = new Schema({
    from: String,
    fromId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    to: [String],
    toLists: [{
        type: Schema.Types.ObjectId,
        ref: "List",
    }],
    cc: [String],
    ccLists: [{
        type: Schema.Types.ObjectId,
        ref: "List",
    }],
    bcc: [String],
    bccLists: [{
        type: Schema.Types.ObjectId,
        ref: "List",
    }],
    subject: String,
    content: String,
    time: Date
}, {
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;

            delete ret._id;
        }
    }
});

export interface IEmail extends Document {
    from: string;
    fromId: string;
    to: [string];
    toLists: [string],
    cc: [string];
    ccLists: [string],
    bcc: [string],
    bccLists: [string],
    subject: string,
    content: string,
    time: Date
}


