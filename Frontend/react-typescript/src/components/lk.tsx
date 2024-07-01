"use strict"
import { root } from '../index';
import React, { useEffect, useState } from 'react';
import { login } from '../api/jwt'
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { lk } from '../api/lk'
import { changePassword } from '../api/changepassword';

function LkPage() {

    const [userLogin, setUserLogin] = useState('');
    
    const [oldPassword, setOldPassword] = useState('');
    const [NewPassword, setNewPassword] = useState('');
    const [NewPasswordTwo, setNewPasswordTwo] = useState('');

    let userData: any;

    useEffect(() => {
        async function getUserData() {
            userData = await lk(localStorage.getItem(localStorage.key(0) as string) as string);
            setUserLogin(userData.login);
        };
        getUserData();
    }, []);

    async function changePasswordClick() {
        if(NewPassword == NewPasswordTwo || NewPassword == null || oldPassword == null){
            let answer = await changePassword(localStorage.getItem(localStorage.key(0) as string) as string, 
                                                                    localStorage.getItem(localStorage.key(1) as string) as string, 
                                                                                            NewPassword, oldPassword);
            console.log(answer);
        } else {
            console.log("Новые пароли не совпадают!");
        }
    }

    return (
        <div className="Lk">
            <h1>Добро пожаловать в личный кабинет!</h1>
            <p>Ваш логин: { userLogin }</p>
            <label htmlFor="oldpassword">Старый пароль</label>
            <input type="text" name="oldpassword" id="oldpassword" onChange={(event) => setOldPassword(event.target.value)}></input>
            <br></br>
            <br></br>
            <label htmlFor="newpassword">Новый пароль</label>
            <input type="text" name="newpassword" id="newpassword" onChange={(event) => setNewPassword(event.target.value)}></input>
            <br></br>
            <br></br>
            <label htmlFor="newpasswordtwo">Повтор нового пароля</label>
            <input type="text" name="newpasswordtwo" id="newpasswordtwo" onChange={(event) => setNewPasswordTwo(event.target.value)}></input>
            <br></br>
            <br></br>
            <button onClick={changePasswordClick}>Сменить пароль</button>
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