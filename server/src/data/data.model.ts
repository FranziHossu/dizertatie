/** Mongoose */
import { Document, Schema } from 'mongoose';

export const dataSchema: Schema = new Schema({
    nr: Number,
    Sender: String,
}, {
        toJSON: {
            transform: function (doc, ret) {
                ret.id = ret._id;

                delete ret._id;
            }
        }
    });

export interface IData extends Document {
    nr: number;
    Sender: string;
}


