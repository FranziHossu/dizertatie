/** Mongoose */
import { Document, Schema } from 'mongoose';


//User Schema
export const userSchema: Schema = new Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String, 
    token: String,
    passwordToken: String,
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
    passwordToken: string
}


