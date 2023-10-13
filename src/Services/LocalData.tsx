export const saveData = (token, role, name) => {
    localStorage.setItem('token', token)
    localStorage.setItem('role', role)
    localStorage.setItem('name', name)
}