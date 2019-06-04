import { getToken, getTokenType } from "./localStorage";
import { redirectToSpotifyOauth } from "./spotifyCredentials";
import { get } from "lodash/fp";

// TODO: make url ENV
const URL = "https://api.spotify.com/v1";

// ENDPOINT SHOULD START WITH /
export function api<ResponseType>(
  endpoint: string,
  { body, ...customConfig }: any = {}
): Promise<ResponseType> {
  console.log(endpoint);
  let token = getToken();
  let tokenType = getTokenType() || "Bearer";

  let headers: any = { "content-type": "application/json" };

  if (token) {
    headers.Authorization = `${tokenType} ${token}`;
  }

  let config = {
    ...customConfig,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      ...headers,
      ...customConfig.headers
    },
    method: body ? "POST" : "GET"
  };

  return window.fetch(`${URL}${endpoint}`, config).then(response => {
    if (response.status === 401) {
      redirectToSpotifyOauth();
    }
    if (!response.ok) {
      throw new Error(JSON.stringify(response));
    }

    return response.json() as Promise<ResponseType>;
  });
}

// interface Artist {

// external_urls:
// spotify: "https://open.spotify.com/artist/1yAwtBaoHLEDWAnWR87hBT"
// __proto__: Object
// followers:
// href: null
// total: 893876
// __proto__: Object
// genres: Array(10)
// 0: "alternative rock"
// 1: "garage rock"
// 2: "indie folk"
// 3: "indie pop"
// 4: "indie rock"
// 5: "lo-fi"
// 6: "modern rock"
// 7: "pop rock"
// 8: "stomp and holler"
// 9: "washington indie"
// length: 10
// __proto__: Array(0)
// href: "https://api.spotify.com/v1/artists/1yAwtBaoHLEDWAnWR87hBT"
// id: "1yAwtBaoHLEDWAnWR87hBT"
// images: (3) [{…}, {…}, {…}]
// name: "Modest Mouse"
// popularity: 69
// type: "artist"
// uri: "spotify:artist:1yAwtBaoHLEDWAnWR87hBT"
// __proto__: Object
// 1:
// external_urls: {spotify: "https://open.spotify.com/artist/0pes7hMCunmJm6A74tqQW8"}
// followers: {href: null, total: 88}
// genres: []
// href: "https://api.spotify.com/v1/artists/0pes7hMCunmJm6A74tqQW8"
// id: "0pes7hMCunmJm6A74tqQW8"
// images: []
// name: "Jeremiah Green of Modest Mouse"
// popularity: 1
// type: "artist"
// uri: "spotify:artist:0pes7hMCunmJm6A74tqQW8"
// __proto__: Object
// }

interface ArtistsResponse {
  href: string;
  items: unknown[];
  limit: number;
  next: unknown;
  offset: number;
  previous: unknown;
  total: number;
}

export function searchForArtists(
  term: string
): Promise<SpotifyApi.ArtistObjectFull[]> {
  term = encodeURIComponent(term);

  return api<SpotifyApi.SearchResponse>(`/search?q=${term}&type=artist`).then(
    get("artists.items")
  );
}

export type Group = "album" | "single" | "appears_on" | "compilation";

export function getAlbumsByArtistId(id: string, ...includeGroups: Group[]) {
  let includeGroupsBlock =
    includeGroups.length > 0
      ? `?include_groups=${includeGroups.join(",")}`
      : "";

  let limitBlock = includeGroupsBlock ? "&limit=50" : "?limit=50";

  return api<SpotifyApi.ArtistsAlbumsResponse>(
    `/artists/${id}/albums${includeGroupsBlock}${limitBlock}`
  );
}
