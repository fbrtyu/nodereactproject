"use strict";
import { Router, Response, Request } from "express";
import { registration } from "../../services/jwt/registration";
import { login } from "../../services/jwt/login";
import { lk } from "../../services/lk"

export const authRouter = Router({});

authRouter.post('/registration', async (req: Request, res: Response) => {
    registration(req.body.login, req.body.password, res);
})

authRouter.post('/login', (req: Request, res: Response) => {
    login(req.body.accessToken, req.body.refreshToken, req.body.login, req.body.password, res);
})

authRouter.post('/lk', (req: Request, res: Response) => {
    lk(req.body.accessToken, res);
})

authRouter.post('/shop', (req: Request, res: Response) => {
    login(req.body.accessToken, req.body.refreshToken, req.body.login, req.body.password, res);
})