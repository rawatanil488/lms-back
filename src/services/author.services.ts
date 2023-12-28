import { AuthorModel } from "../models/authors.models";

export const getAuthorsById = (id: string) => AuthorModel.findById(id);
export const getAuthorsByEmail = (email: string) => AuthorModel.findOne({email});
export const deleteAuthorById = (id:string) => AuthorModel.findByIdAndDelete(id);
export const updateAuthorById = (id:string, values: Record<string, any>) => AuthorModel.findByIdAndUpdate(id, values);
export const createAuthors = (values: Record<string, any>) => new AuthorModel(values).save().then((author) => author.toObject);