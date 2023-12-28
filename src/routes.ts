import express from 'express';
import { register, login, deleteUser, updateUser } from './controllers/users.controllers';

const router = express.Router();

export default () : express.Router => {
    // User Routes
    router.post('/auth/register', register);
    router.post('/auth/login', login);
    router.delete('/users/:id', deleteUser);
    router.patch('/users/:id', updateUser);
    return router;
}