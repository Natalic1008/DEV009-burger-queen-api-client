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

export const addProduct = (data: { name: string, type: string, price: number, id: string, image: any }, token: string) => {
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
      image: data.image,
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

 export const addUsers = (data: { name: string, email: string, password: string, role:string, id: string}, token:string) => {
  return fetch(`http://localhost:8080/users`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip, deflate, br',
          'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
          id: data.id,
      })
  });
};

export const deleteUser = (id:string, token:string) => {
  return fetch(`http://localhost:8080/users/${id}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip, deflate, br',
          'Authorization': `Bearer ${token}`
      },
  })
}

export const editUser = (id:string, updatedData:object, token:string) => {
  return fetch(`http://localhost:8080/users/${id}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip, deflate, br',
          'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updatedData)
  });
};

export const users = (token:string) => {
  return fetch('http://localhost:8080/users', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip, deflate, br',
          'Authorization': `Bearer ${token}`
      },
  })
}

export const userOrder = (id:string, token:string) => {
  return fetch(`http://localhost:8080/orders/${id}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip, deflate, br',
          'Authorization': `Bearer ${token}`
      }
  })
};

export const patchOrder = (id:string, updatedData:any, token:string) => {
  return fetch(`http://localhost:8080/orders/${id}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip, deflate, br',
          'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updatedData)
  });
};