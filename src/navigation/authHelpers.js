const tokenKey = 'CEMEX-TOKEN'

export function setToken(token) {
    localStorage.setItem(tokenKey, token)
}

export function getToken() {
    return localStorage.getItem(tokenKey)
}

export function deleteToken() {
    localStorage.removeItem(tokenKey)
}