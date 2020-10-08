import Cookies from "js-cookie";

const TokenKey = "token";
export function setToken(token) {
  return Cookies.set(TokenKey, token);
}
export function getToken(token) {
  return Cookies.get(TokenKey);
}
export function removeToken() {
  return Cookies.remove(TokenKey);
}
