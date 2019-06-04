import React, { useState, useEffect } from "react";
import { getAlbumsByArtistId } from "../../utils/api";
import { get } from "../../utils/utils";
import { DOH_IMAGE_SRC } from "../../resources/doh";

interface ArtistOverviewProps {
  artistID: string;
}

function sortAlbums(albums: any[]) {
  return albums;
}

const ArtistOverview: React.FC<ArtistOverviewProps> = ({ artistID }) => {
  let [albums, setAlbums] = useState([] as any[]);

  useEffect(() => {
    if (artistID) {
      getAlbumsByArtistId(artistID).then(albums => {
        console.log(albums);
        let sortedAlbums = sortAlbums(albums.items);
        setAlbums(sortedAlbums);
      });
    }
  }, [artistID]);

  return (
    <form>
      <ul>
        {albums.map(({ id, name, images }) => (
          <li key={id}>
            <label htmlFor={id} key={id}>
              <img
                src={
                  images
                    ? get(
                        () =>
                          images.find((image: any) => image.width === 64).url
                      )
                    : DOH_IMAGE_SRC
                }
                alt={name}
              />
              {name}
              <input id={id} type="checkbox" value={id} defaultChecked />
            </label>
          </li>
        ))}
      </ul>
    </form>
  );
};

export default ArtistOverview;
