"use strict"
export async function registration(login: string, password: string) {
    const data = {
        login: login,
        password: password
    };

    const response = await fetch('http://localhost:7777/registration', {
        method: "POST",
        mode: "cors",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });

    console.log(response.status);

    let tokens = await response.json();

    localStorage.setItem('access_token', tokens.accessToken);
    localStorage.setItem('refresh_token', tokens.refreshToken);
};

export async function login(login: string = "", password: string = "", accessToken: string = "", refreshToken: string = "") {
    const data = {
        login: login,
        password: password,
        accessToken: accessToken,
        refreshToken: refreshToken
    };

    console.log(data);

    const response = await fetch('http://localhost:7777/login', {
        method: "POST",
        mode: "cors",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });

    console.log(response.status);

    let tokens = await response.json();

    localStorage.setItem('access_token', tokens.accessToken);
    localStorage.setItem('refresh_token', tokens.refreshToken);

    // let tokens = await response.json();

    // console.log(tokens);

    // localStorage.setItem('access_token', tokens.access_token);
    // localStorage.setItem('refresh_token', tokens.refresh_token);
    // localStorage.getItem('test')
};