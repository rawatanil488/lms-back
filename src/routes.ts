import express from 'express';
import { register, login, deleteUser, updateUser } from './controllers/users.controllers';
import { authorDetails, updateAuthor, deleteAuthor, createAuthor } from './controllers/authors.controllers';
import { BooksById, BooksList, registerNewBook } from './controllers/books.controllers';

const router = express.Router();

export default () : express.Router => {
    // User Routes
    router.post('/auth/register', register);
    router.post('/auth/login', login);
    router.delete('/users/:id', deleteUser);
    router.patch('/users/:id', updateUser);

    // Author Routes
    router.get('/author/:id', authorDetails);
    router.put('/author/:id', updateAuthor);
    router.delete('/author/:id', deleteAuthor);
    router.post('/author', createAuthor);

    // Books Routes
    router.get('/books', BooksList);
    router.get('/books/:id', BooksById);
    router.post('/books', registerNewBook)

    return router;
}