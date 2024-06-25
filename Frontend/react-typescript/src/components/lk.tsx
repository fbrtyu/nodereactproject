"use strict"
import { root } from '../index';
import React, { useEffect, useState } from 'react';
import { login } from '../api/jwt'
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { lk } from '../api/lk'

function LkPage() {

    const [accessToken, setAccessToken] = useState('');
    const [userLogin, setUserLogin] = useState('');

    let userData: any;

    useEffect(() => {
        async function getUserData() {
            setAccessToken(localStorage.getItem(localStorage.key(0) as string) as string);
            userData = await lk(accessToken);
            console.log(userData);
            setUserLogin(userData.login);
        };
        getUserData();
    }, []);

    return (
        <div className="Lk">
            <h1>Добро пожаловать в личный кабинет!</h1>
            <p>Ваш логин: { userLogin }</p>
        </div>
    )
}

export default function renderLkPage() {
    root.render(
        <>
            <LkPage />
        </>
    );
}