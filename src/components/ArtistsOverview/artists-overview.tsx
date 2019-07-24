import React, { useEffect, useState } from 'react'
import Albums from '../Albums/albums'

type ArtistsOverviewProps = { artists: SpotifyApi.ArtistObjectFull[] }

const ArtistsOverview: React.FC<ArtistsOverviewProps> = (
  props: ArtistsOverviewProps,
) => {
  const { artists } = props

  let [selectedArtistID, setSelectedArtistID] = useState('')

  useEffect(() => {
    if (artists.length === 1) {
      setSelectedArtistID(artists[0].id)
    }
  }, [artists])

  let numberOfArtists = artists.length

  return (
    <>
      {numberOfArtists === 0 ? (
        <p>no artists</p>
      ) : numberOfArtists === 1 ? (
        // don't show an option, just pick for them in the effect,
        <div />
      ) : (
        <div>
          {artists.map(({ name, id }) => (
            <div key={id}>
              <p>{name}</p>
              <button type="submit" onClick={_ => setSelectedArtistID(id)}>
                Select
              </button>
            </div>
          ))}
        </div>
      )}

      <Albums artistID={selectedArtistID} />
    </>
  )
}

export default ArtistsOverview
