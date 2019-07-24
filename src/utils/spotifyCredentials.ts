import { setToken, setTokenExpiresIn, setTokenType } from './localStorage'

export interface SpotifyCredentials {
  access_token: string
  token_type: string
  expires_in: string
}

export function getCredentialsFromURL(): SpotifyCredentials | undefined {
  let [_, valuePairs] = window.location.href.split('#')

  if (valuePairs) {
    let credentials: SpotifyCredentials = valuePairs
      .split('&')
      .map(pairs => pairs.split('='))
      .reduce(
        (acc, [key, value]) => ({ ...acc, [key]: value }),
        {} as SpotifyCredentials,
      )

    setToken(credentials.access_token)
    setTokenType(credentials.token_type)
    setTokenExpiresIn(credentials.expires_in)

    return credentials
  }
}

export function redirectToSpotifyOauth() {
  let clientId = '283410c4cad14282847dbef1a16a50d2'
  let responseType = 'token'
  let scopes = [
    'playlist-read-private',
    'playlist-modify-public',
    'playlist-modify-private',
    'playlist-read-collaborative',
    'user-read-email',
    'user-read-birthdate',
    'user-read-private',
    'user-follow-modify',
  ].join(' ')
  let redirect = 'http://localhost:3000'

  let authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=${responseType}&scope=${scopes}&redirect_uri=${redirect}`
  window.location.replace(authUrl)
}
