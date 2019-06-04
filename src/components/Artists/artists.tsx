import React, { useState, useEffect } from "react";
import ArtistOverview from "../ArtistOverview/artist-overview";
import { isEqual, head } from "lodash/fp";
import { length } from "../../utils/utils";
import { number } from "prop-types";

type ArtistsProps = { artists: SpotifyApi.ArtistObjectFull[] };

// this becomes artistoverview, AO becomes albums, artists becomes
/**
 {(numberOfArtists === 0 ? (
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


  </div>)})
 */
const Artists: React.FC<ArtistsProps> = (props: ArtistsProps) => {
  const { artists } = props;

  let [selectedArtistID, setSelectedArtistID] = useState("");

  useEffect(() => {
    if (artists.length === 1) {
      setSelectedArtistID(artists[0].id);
    }
  }, [artists]);

  let numberOfArtists = artists.length;

  return (
    <div>
      <ArtistOverview artistID={selectedArtistID} />
    </div>
  );
};

export default Artists;
