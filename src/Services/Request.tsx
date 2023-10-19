export const auth = (email:string, password:string) => {
    return fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });
};