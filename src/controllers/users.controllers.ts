import express from 'express';
import { createUser, deleteUserById, getUserById, getUsersByEmail } from '../services/users.services';
import { random, authentication } from '../helpers';

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send('Email/Password is wrong!!!');
        }

        const user = await getUsersByEmail(email);

        if (!user) {
            return res.status(404).send(`User with email ${email} not foud, kindly register`);
        }
        let expectedHash = "";
        if (typeof(user.authentication?.salt) === 'string') {
            expectedHash = authentication(user.authentication.salt, password);
        }

        if (user.authentication?.password !== expectedHash) {
            return res.sendStatus(403);
        }
        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie('RWT-AUTH', user.authentication.sessionToken, {domain: "localhost", path:'/'})

        return res.status(200).json({
            "email": user.email,
            "username": user.username,
            "id": user._id,
            "sess-id": user.authentication.sessionToken
        }).end();

    } catch (error) {
        console.error(error);
        return res.sendStatus(400);
    }
}

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username } = req.body;

        if (!email ||  !password || !username) {
            return res.sendStatus(400);
        }
        const existingUser = await getUsersByEmail(email);
        if (existingUser) {
            return res.status(400).send("User already exists, please go to login.");
        }
        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        })
        return res.status(200).json(user).end();
    } catch (error) {
        console.error(error);
        return res.sendStatus(400);
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;
        const deletedUser = await deleteUserById(id);
        return res.json(deletedUser);
    } catch (error) {
        console.error(error);
        return res.sendStatus(400);
    }
}

export const updateUser =async (req: express.Request, res: express.Response) => {
    try {

        const { id } = req.params;
        const { username } = req.body;

        if (!username) {
            return res.sendStatus(400);
        }

        const user = await getUserById(id);

        if (user) user.username = username;
        await user?.save();

        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}