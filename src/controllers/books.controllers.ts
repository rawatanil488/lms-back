import express from 'express';
import {getBookById, getBooks, createBook} from '../services/books.services';

export const BooksList = async (req: express.Request, res: express.Response) => {
    try {
        const books = await getBooks();
        return res.send(200).json(books).end() 
    } catch (err) {
        res.sendStatus(500)
    }
}

export const BooksById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.sendStatus(400);
        }
        const book = await getBookById(id);
        if (!book) {
            res.sendStatus(404);
        }
        return res.status(200).json(book).end
    } catch (error) {
        res.sendStatus(500);
    }
}

export const registerNewBook = async (req: express.Request, res: express.Response) => {
    try {
        const { name, author, publishedBy, publishedDate } = req.body;
        if(!name || !author || !publishedBy || !publishedDate) {
            return res.sendStatus(400)
        }

        const book = await createBook({
            name,
            author,
            publishedBy,
            publishedDate
        })
        return res.status(200).json(book).end();
    } catch (error) {
        return res.sendStatus(500);
    }
}