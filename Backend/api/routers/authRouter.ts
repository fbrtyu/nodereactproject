"use strict";
import { Router, Response, Request } from "express";
import { registration } from "../../services/jwt/registration";

export const authRouter = Router({});

authRouter.post('/registration', async (req: Request, res: Response) => {
    registration(req.body.login, req.body.password, res);
})