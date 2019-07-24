import React, { Suspense } from 'react'
import { useForceUpdate } from '../../hooks/use-force-update'
import { clearSpotifyCredentials } from '../../utils/localStorage'
import { getCredentialsFromURL } from '../../utils/spotifyCredentials'
import './App.css'

const AuthenticatedApp = React.lazy(() =>
  import('../AuthenticatedApp/AuthenticatedApp'),
)
const UnauthenticatedApp = React.lazy(() =>
  import('../UnauthenticatedApp/UnauthenticatedApp'),
)

const App: React.FC = () => {
  let forceUpdate = useForceUpdate()

  let credentials = getCredentialsFromURL()

  function handleLogout() {
    credentials = undefined

    forceUpdate()

    clearSpotifyCredentials()
  }

  return (
    <Suspense fallback={<p> Loading... </p>}>
      <header>
        <button type="submit" onClick={handleLogout}>
          logout
        </button>
      </header>
      {credentials ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </Suspense>
  )
}

export default App
