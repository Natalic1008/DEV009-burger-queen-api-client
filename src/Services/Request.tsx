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

export const products =(token:string) => {
    return fetch('http://localhost:8080/products',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
            'Authorization': `Bearer ${token}`
        },
    })
}

export const postOrder = (data: {
    client: string,
    table: number,
    product: string,
}, token: string) => {
    return fetch(`http://localhost:8080/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });
};