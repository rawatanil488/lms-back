import mongoose from "mongoose";

const AuthorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique:true, required: true },
    ratings: { type: Number, min:0, max:5, required:true },
    country: { type: String, required: true },
})

export const AuthorModel = mongoose.model('Author', AuthorSchema);