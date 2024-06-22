"use strict"
import { root } from '../index';
import React, { useRef, useState } from 'react';
import { registration } from '../api/jwt'
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
function RegistrationPage() {
    const [inputLogin, setLogin] = useState('');
    const [inputPassword_1, setPassword_1] = useState('');
    const [inputPassword_2, setPassword_2] = useState('');

    function signup() {
        if (inputPassword_1 === inputPassword_2 && inputPassword_1 !== "") {
            registration(inputLogin, inputPassword_1);
        } else {
            console.log("Пароли не совпадают!")
        }
    };

    return (
        <div className="signupForm">
            <p>Регистрация</p>
            <a href="login.html">Вход</a>

            <br></br>

            <label htmlFor="login">Логин</label>
            <input type="text" name="login" id="login" onChange={(event) => setLogin(event.target.value)}></input>

            <br></br>

            <label htmlFor="password_1">Пароль</label>
            <input type="password_1" name="password_1" id="password_1" onChange={(event) => setPassword_1(event.target.value)}></input>

            <br></br>

            <label htmlFor="password_2">Повтор пароля</label>
            <input type="password_2" name="password_2" id="password_2" onChange={(event) => setPassword_2(event.target.value)}></input>

            <br></br>

            <button onClick={() => { signup() as any }}>Зарегистрироваться</button>
        </div>
    )
}

export default function renderRegistrationPage() {
    root.render(
        <React.StrictMode>
            <RegistrationPage />
        </React.StrictMode>
    );
}