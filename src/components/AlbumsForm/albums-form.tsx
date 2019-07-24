import React from 'react'
import { useListWithCheckboxes } from '../../hooks/use-list-for-checkboxes'
import { DOH_IMAGE_SRC } from '../../resources/doh'
import { preventDefaultAndCall, safeGet } from '../../utils/utils'

interface AlbumsFormProps {
  albums: SpotifyApi.AlbumObjectFull[]
  onSubmit: (albums: SpotifyApi.AlbumObjectFull[]) => void
}

const AlbumsForm: React.FC<AlbumsFormProps> = ({ albums, onSubmit }) => {
  let [options, setCheckedByIndex] = useListWithCheckboxes(
    albums.map(album => ({ ...album, checked: false })),
  )

  // let [playlistName, setPlaylistName] = useState('')

  return (
    <form onSubmit={preventDefaultAndCall(onSubmit, albums)}>
      <button type="submit">Make my playlist!</button>
      <ul>
        {options.map(({ id, name, images }, i) => (
          <li key={id}>
            <label htmlFor={id} key={id}>
              <img
                src={
                  images
                    ? safeGet(
                        // @ts-ignore
                        () => images.find(image => image.width === 64).url,
                      )
                    : DOH_IMAGE_SRC
                }
                alt={name}
              />
              {name}
              <input
                id={id}
                type="checkbox"
                value={id}
                onChange={() => setCheckedByIndex(i)}
                defaultChecked
              />
            </label>
          </li>
        ))}
      </ul>
    </form>
  )
}

export default AlbumsForm
