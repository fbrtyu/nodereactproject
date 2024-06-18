"use strict"
export async function registration(login: string, password: string) {
    const data = {
        login: login,
        password: password
    };

    const response = await fetch('http://localhost:7777/registration', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "no-cors", // no-cors, *cors, same-origin
    });
    console.log(await response.text);
};