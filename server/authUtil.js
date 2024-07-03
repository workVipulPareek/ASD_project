// authUtils.js
export const isLoggedIn = () => {
    return !!localStorage.getItem('token');
  };
  
  export const isAdmin = () => {
    const storedRoles = localStorage.getItem('roles');
    const roles = storedRoles ? JSON.parse(storedRoles) : [];
    return roles.includes('admin');
  };
  
  export const logout = () => {
    localStorage.removeItem('token');
  };
  