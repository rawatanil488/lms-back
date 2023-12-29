import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    publishedBy: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
    publishedDate: { type: Date, required: true },
    language: { type: Date, required: true }
})

export const BookModel = mongoose.model('Book', BookSchema);