"use strict";
import { Router, Response, Request } from "express";
import { lk } from "../../services/lk"

export const userSettingsRouter = Router({});

userSettingsRouter.post('/lk', (req: Request, res: Response) => {
    lk(req.body.accessToken, res);
})