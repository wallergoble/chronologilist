import React, { useState, FormEvent } from "react";
import { searchForArtists } from "../../utils/api";
import Artists from "../Artists/artists";

const AuthenticatedApp: React.FC = () => {
  let [artistTerm, setArtistTerm] = useState("hop along");
  let [artists, setArtists] = useState([] as SpotifyApi.ArtistObjectFull[]);

  function handleArtistTermSubmit(term: string) {
    return (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      searchForArtists(term)
        .then(setArtists)
        .catch(console.error);
    };
  }
  return (
    <React.Fragment>
      <h1>Form</h1>
      <form autoComplete="off" onSubmit={handleArtistTermSubmit(artistTerm)}>
        <label htmlFor="artists" />
        <input
          type="text"
          name="artists"
          id="artists"
          placeholder="Hop Along"
          value={artistTerm}
          onChange={e => setArtistTerm(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>

      <Artists artists={artists} />
    </React.Fragment>
  );
};

export default AuthenticatedApp;
