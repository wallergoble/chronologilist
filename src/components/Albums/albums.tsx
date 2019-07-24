import { apply, chain, map, pipe, prop } from 'ramda'
import React, { useEffect, useState } from 'react'
import { useUser } from '../../context/user-context'
import {
  addTracksToPlaylist,
  createPlaylist,
  getAlbumsByArtistId,
  getTracks,
} from '../../utils/api'
import { log } from '../../utils/utils'
import AlbumsForm from '../AlbumsForm/albums-form'

interface AlbumsProps {
  artistID: string
}

const Albums: React.FC<AlbumsProps> = ({ artistID }) => {
  let [albums, setAlbums] = useState([] as SpotifyApi.AlbumObjectFull[])

  let { country, id: userId } = useUser()

  function handleSubmit(chosenAlbums: SpotifyApi.AlbumObjectFull[]) {
    Promise.all([
      createPlaylist(userId),
      Promise.all(
        map(
          pipe(
            prop('id'),
            getTracks,
          ),
          chosenAlbums,
        ),
      )
        .then(chain(map(prop('uri'))))
        .catch(log('problem getting tracks', 'error')),
    ])
      .then(apply(addTracksToPlaylist))
      .catch(log('error applying tracks', 'error'))
  }

  useEffect(() => {
    if (artistID) {
      getAlbumsByArtistId(artistID)
        .then(albums => {
          if (albums) {
            // TODO
            // add form to filter by album_type and album_group
            // album_type album, single, compilation
            // album_group album, single, appears_on
            //                            seems to be the same^
            setAlbums(
              albums
                .filter(byCountryCode(country))
                .filter(bySelectedGroups)
                .sort(byReleaseDateAscending),
            )
          }
        })
        .catch(console.error)
    }
  }, [artistID, country])

  return (
    <div>
      {albums.length && <AlbumsForm albums={albums} onSubmit={handleSubmit} />}
    </div>
  )
}

function byCountryCode(countryCode: string) {
  return (album: SpotifyApi.AlbumObjectFull) =>
    album.available_markets
      ? album.available_markets.includes(countryCode)
      : true
}
function bySelectedGroups(album: any) {
  return true
}
function byReleaseDateAscending(
  a: SpotifyApi.AlbumObjectFull,
  b: SpotifyApi.AlbumObjectFull,
) {
  return Date.parse(a.release_date) - Date.parse(b.release_date)
}

export default Albums
