import React from 'react'
import { redirectToSpotifyOauth } from '../../utils/spotifyCredentials'

const UnauthenticatedApp: React.FC = () => {
  return (
    <div>
      <h1>Login, please!</h1>
      <button onClick={_ => redirectToSpotifyOauth()}>
        Make this button oook liks spotif
      </button>
    </div>
  )
}

export default UnauthenticatedApp
