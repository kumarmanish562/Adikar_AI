// Authentication utility functions

export const getToken = () => {
    return localStorage.getItem('token');
};

export const setToken = (token) => {
    localStorage.setItem('token', token);
};

export const removeToken = () => {
    localStorage.removeItem('token');
};

export const isAuthenticated = () => {
    const token = getToken();
    if (!token) return false;
    
    try {
        // Basic token validation - check if it's not expired
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;
        return payload.exp > currentTime;
    } catch (error) {
        // If token is malformed, consider it invalid
        return false;
    }
};

export const logout = () => {
    removeToken();
    window.location.href = '/login';
};