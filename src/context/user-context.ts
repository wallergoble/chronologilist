import React from 'react'

export type SpotifyUser = SpotifyApi.UserObjectPrivate &
  SpotifyApi.UserObjectPublic

type UserContextState = SpotifyUser

let UserContext = React.createContext<UserContextState | undefined>(undefined)

function useUser() {
  const context = React.useContext(UserContext)

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }

  return context
}

export { UserContext, useUser }
