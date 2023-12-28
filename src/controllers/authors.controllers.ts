import express from "express";
import { getAuthorsById, getAuthorsByEmail, deleteAuthorById, createAuthors } from "../services/author.services";

export const authorDetails = async ( req: express.Request, res: express.Response ) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send("Please enter correct ID of author!!");
        }

        const author = await getAuthorsById(id);
        if(!author) {
            return res.status(404).send("Author you requested, doesn't exist!!");
        }

        return res.status(200).json(author).end()
    } catch (error) {
        return res.sendStatus(500);
    }
}

export const updateAuthor = async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;
        const {country, ratings} = req.body;
        if (!id || !country || ratings) {
            res.sendStatus(400);
        }
        const author = await getAuthorsById(id);
        if(!author) {
            return res.sendStatus(404);
        }
        author.country = country;
        author.ratings = ratings;
        await author.save();
        return res.status(200).json(author).end();
    } catch (error) {
        return res.sendStatus(500);
    }
}

export const deleteAuthor = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        if(!id) return res.sendStatus(400);
        const deletedAuthor = await deleteAuthorById(id);
        return res.status(200).json(deletedAuthor).end();
    } catch (error) {
        return res.sendStatus(500);
    }
}

export const createAuthor = async (req: express.Request, res: express.Response) => {
    try {
        const { name, email, country, ratings } = req.body;
        if ( !name || !email || !country || !ratings ) {
            return res.sendStatus(400);
        }

        const author = await getAuthorsByEmail(email);
        if (author) return res.status(400).send("Author already exists");

        const newAuthor = await createAuthors({
            name, email, country, ratings
        })
        return res.send(200).json(newAuthor).end();
    } catch (error) {
        return res.sendStatus(500);
    }
}
