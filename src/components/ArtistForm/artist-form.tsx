import React, { FormEvent, useState } from 'react'

type ArtistFormProps = {
  onSubmit: (term: string) => (e: FormEvent<HTMLFormElement>) => void
}

const ArtistForm: React.FC<ArtistFormProps> = ({ onSubmit }) => {
  let [artistTerm, setArtistTerm] = useState('hop along')

  return (
    <React.Fragment>
      <h1>Form</h1>
      <form autoComplete="off" onSubmit={onSubmit(artistTerm)}>
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
    </React.Fragment>
  )
}

export default ArtistForm
