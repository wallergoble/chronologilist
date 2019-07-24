enum LocalStorageKeys {
  Token = "__spotify_token__",
  TokenType = "__spotify_token_type__",
  TokenExpiresIn = "__spotify_expires_in__"
}

export function getToken(): string | null {
  return window.localStorage.getItem(LocalStorageKeys.Token);
}

export function setToken(token: string) {
  window.localStorage.setItem(LocalStorageKeys.Token, token);
}

export function getTokenType(): string | null {
  return window.localStorage.getItem(LocalStorageKeys.TokenType);
}

export function setTokenType(tokenType: string) {
  window.localStorage.setItem(LocalStorageKeys.TokenType, tokenType);
}

export function getTokenExpiresIn(): string | null {
  return window.localStorage.getItem(LocalStorageKeys.TokenExpiresIn);
}

export function setTokenExpiresIn(tokenExpiresIn: string) {
  window.localStorage.setItem(LocalStorageKeys.TokenExpiresIn, tokenExpiresIn);
}

export function clearSpotifyCredentials() {
  // @ts-ignore
  setToken(null);
  // @ts-ignore
  setTokenType(null);
  // @ts-ignore
  setTokenExpiresIn(null);

  window.location.replace("http://localhost:3000");
}
