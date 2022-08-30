const token_key = 'vite_token';


export function setToken(token = '') {
  localStorage.setItem(token_key, token);
}

export function getToken() {
  return localStorage.getItem(token_key);
}