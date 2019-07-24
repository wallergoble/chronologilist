import React, { FormEvent, useEffect, useState } from 'react'
import { SpotifyUser, UserContext } from '../../context/user-context'
import { api, searchForArtists } from '../../utils/api'
import ArtistForm from '../ArtistForm/artist-form'
import ArtistsOverview from '../ArtistsOverview/artists-overview'

const AuthenticatedApp: React.FC = () => {
  let [artists, setArtists] = useState([] as SpotifyApi.ArtistObjectFull[])
  let [user, setUser] = useState(({} as unknown) as SpotifyUser)

  function handleArtistTermSubmit(term: string) {
    return (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      searchForArtists(term)
        .then(setArtists)
        .catch(console.error)
    }
  }

  useEffect(() => {
    async function getUser() {
      let user = await api('/me')

      setUser(user as SpotifyUser)
    }

    getUser()
    // Empty dependencies is equivalent to didMount more or less
  }, [])
  // TODO: On new search, clear artists
  return (
    <UserContext.Provider value={user}>
      <ArtistForm onSubmit={handleArtistTermSubmit} />
      <ArtistsOverview artists={artists} />
    </UserContext.Provider>
  )
}

export default AuthenticatedApp
