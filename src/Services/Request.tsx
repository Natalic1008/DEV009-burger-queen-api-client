import { Product } from "../pages/Waiter/OrdersList";

export const auth = (email: string, password: string) => {
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

export const products = (token: string) => {
  return fetch('http://localhost:8080/products', {
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
  table: string,
  products: Product[],
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


export const addProduct = (data: { name: string, type: string, price: number, id: string }, token: string) => {
  return fetch(`http://localhost:8080/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      name: data.name,
      type: data.type,
      price: data.price,
      id: data.id,
    })
  });
};

export const allOrders = (token: string) => {
  return fetch('http://localhost:8080/orders', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
      'Authorization': `Bearer ${token}`
    },
  });
};

export const deleteProduct = (id: number, token: string) => {
  return fetch(`http://localhost:8080/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
      'Authorization': `Bearer ${token}`
    },
  });    
};

export const deleteOrder = (id: number, token: string) => {
  return fetch(`http://localhost:8080/orders/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
      'Authorization': `Bearer ${token}`
    },
  });
};

export const editProduct = (id: number, updatedData: any, token: string) => {
  return fetch(`http://localhost:8080/products/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(updatedData)
  });
 };


