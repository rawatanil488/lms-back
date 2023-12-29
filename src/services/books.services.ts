import { BookModel } from "../models/books.models";

export const getBooks = () => BookModel.find();
export const getBookById = (id: string) => BookModel.findById(id);
export const createBook = (values: Record<string, any>) => new BookModel(values).save().then((author) => author.toObject);
export const deleteBookById = (id: string) => BookModel.findByIdAndDelete(id);
export const updateAuthorById = (id: string, values: Record<string, any>) => BookModel.findByIdAndUpdate(id, values);
