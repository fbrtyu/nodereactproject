"use strict"
import { root } from '../index';
import React, { useEffect, useState } from 'react';
import { login } from '../api/jwt'
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
function LoginPage() {
    const [inputLogin, setLogin] = useState('');
    const [inputPassword, setPassword] = useState('');

    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');

    useEffect(() => {
        setAccessToken(localStorage.getItem(localStorage.key(0) as string) as string);
        setRefreshToken(localStorage.getItem(localStorage.key(1) as string) as string);
    }, []);

    function signin() {
        login(inputLogin, inputPassword, accessToken, refreshToken);
    };

    return (
        <div className="signinForm">
            <p>Вход</p>
            <a href="login.html">Вход</a>

            <br></br>

            <label htmlFor="login">Логин</label>
            <input type="text" name="login" id="login" onChange={(event) => setLogin(event.target.value)}></input>

            <br></br>

            <label htmlFor="password">Пароль</label>
            <input type="password" name="password" id="password" onChange={(event) => setPassword(event.target.value)}></input>

            <br></br>

            <button onClick={async () => { signin() as any }}>Войти</button>
        </div>
    )
}

export default function renderLoginPage() {
    root.render(
        <React.StrictMode>
            <LoginPage />
        </React.StrictMode>
    );
}