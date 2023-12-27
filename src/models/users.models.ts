import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true},
        salt: { type: String },
        sessionToken: { type: String },
    },
})

export const UserModel = mongoose.model('User', UserSchema);