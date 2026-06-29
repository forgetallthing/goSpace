const tokenKey = 'gospace_admin_token';

export function getAdminToken() {
  return localStorage.getItem(tokenKey) ?? '';
}

export function setAdminToken(token: string) {
  localStorage.setItem(tokenKey, token);
}

export function clearAdminToken() {
  localStorage.removeItem(tokenKey);
}