import express from 'express';
import { register, login } from './controllers/users.controllers';

const router = express.Router();

export default () : express.Router => {
    router.post('/auth/register', register);
    router.post('/auth/login', login);
    return router;
}