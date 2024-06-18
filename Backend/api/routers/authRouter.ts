"use strict";
import { Router, Response, Request } from "express";
import { registration } from "../../services/jwt/registration";

export const authRouter = Router({});

authRouter.get('/registration', (req: Request, res: Response) => {
    //Here write logic
    registration("login", "password");
    res.send("123");
})

authRouter.post('/login', (req: Request, res: Response) => {
    //Here write logic
})