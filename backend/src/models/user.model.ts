import mongoose, { mongo } from "mongoose";
import bcrypt from "bcrypt";
import { compareValue, hashValue } from "../utils/bcrypt";


export interface UserDocument extends mongoose.Document{
    email: string;
    password: string;
    verified: boolean;
    createdAt: Date;
    updatedAt: Date;

    comparePassword(val:string) : Promise<boolean>;
}

const userSchema = new mongoose.Schema<UserDocument> (
    {
        email: {type: String, unique:true, required: true},
        password: {type:String, required: true},
        verified: {type:Boolean, required: true, default:false},
    },
    {
        timestamps: true, 
    }
);

// Before saving the user in DB
userSchema.pre("save", async function (next){

    // if the password has not beed modified then don't hash it
    if(!this.isModified("password")) {
        return next();
    }

    this.password = await hashValue(this.password);
    next();
});

userSchema.methods.comparePassword = async function (val:string) {
    return compareValue(val, this.password);
}

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;