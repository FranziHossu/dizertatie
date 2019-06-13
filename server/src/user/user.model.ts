/** Mongoose */
import {Document, Schema} from 'mongoose';


//User Schema
export const userSchema: Schema = new Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    role: Number,
    token: String,
    passwordToken: String,
    lastNotification: Date
}, {
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;

            delete ret._id;
            delete ret.password;
        }
    }
});

export interface IUser extends Document {
    username: string;
    password: string;
    token: string;
    firstName: string,
    lastName: string,
    email: string
    role: number;
    passwordToken: string
    lastNotification: Date
}


