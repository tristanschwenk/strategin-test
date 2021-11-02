export const API_URL = process.env.API_URL || 'http://localhost:3001/'
export const TOKEN_KEY = process.env.TOKEN_KEY || 'strateginToken'

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY)
}

export const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token)
}

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY)
}

export const checkToken = () => {
    const token = parseJwt(getToken())
    if (token.exp*1000 < Date.now()) {
        removeToken()
    }
}

export const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

export const fetchApi = (url, options = {}) => {
    const fetchOptions = options;
    fetchOptions.headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
        ...fetchOptions.headers,        
    }

    return fetch(`${API_URL}${url}`, fetchOptions).then(async (response) => {
        if (response.ok) {
            return response.json();
        } else {
            const err = new Error();
            err.message = response.statusText;
            err.response = response;
            err.data = await response.json();
            err.code =  response.status
            throw err;
        }
    })
}

export const getUser = async () => {
    if (!getToken()) return undefined
    const user = {
        fistName: "Bob",
        lastName: "Marley",
    }
    return user
  }

