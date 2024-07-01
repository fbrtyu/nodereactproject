"use strict";
import { Router, Response, Request } from "express";
import { lk } from "../../services/lk";
import { changePassword } from "../../services/changepassword";

export const userSettingsRouter = Router({});

userSettingsRouter.post('/lk', (req: Request, res: Response) => {
    lk(req.body.accessToken, res);
});

userSettingsRouter.post('/changepassword', async (req: Request, res: Response) => {
    let answer = await changePassword(req.body.accessToken, req.body.refreshToken, req.body.newPassword, req.body.oldPassword);
    res.send(answer);
});