export const saveData = (token:string, role: string, name:string) => {
    localStorage.setItem('token', token)
    localStorage.setItem('role', role)
    localStorage.setItem('name', name)
}
