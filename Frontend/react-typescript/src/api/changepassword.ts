"use strict"
export async function changePassword(accessToken: string, refreshToken: string, newPassword: string, oldPassword: string) {
    const data = {
        accessToken: accessToken,
        refreshToken: refreshToken,
        newPassword: newPassword,
        oldPassword: oldPassword
    };

    const response = await fetch('http://localhost:7777/changepassword', {
        method: "POST",
        mode: "cors",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });

    let answer = await response.json();
    
    return answer;
};