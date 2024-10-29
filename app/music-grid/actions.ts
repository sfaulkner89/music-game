"use server";

import {
  IReleaseGroup,
  IReleaseGroupMatch,
  MusicBrainzApi,
} from "musicbrainz-api";
import { CoverArtArchiveApi } from "musicbrainz-api";

export const checkMatches = async (query: string) => {
  const musicBrainzApi = new MusicBrainzApi({
    appName: "music-game",
    appVersion: "1.0.0",
    appContactInfo: "s.faulkner89@gmail.com",
  });

  const data = await musicBrainzApi.search("release-group", {
    query: `query="${query}"`,
    limit: 100,
    offset: 0,
    // inc: ["artists", "releases"],
  });

  return (data["release-groups"] ?? []).map((release: any) => release.title);
};
export const matchGuess = async (guess: string, artist: string) => {
  const musicBrainzApi = new MusicBrainzApi({
    appName: "music-game",
    appVersion: "1.0.0",
    appContactInfo: "s.faulkner89@gmail.com",
  });

  const artistID = (
    await musicBrainzApi.search("artist", {
      query: `artist:${artist}`,
      limit: 1,
      offset: 0,
    })
  ).artists[0].id;

  const getAlbums = async (
    offset: number
  ): Promise<{ cover?: string; album: IReleaseGroup } | false> => {
    const albums = (
      await musicBrainzApi.lookup("artist", artistID, ["release-groups"])
    )["release-groups"];

    if (!albums) return false;

    const albumTitles = albums.map((album: any) => album.title.toLowerCase());

    if (albums.length === 100 && !albumTitles.includes(guess)) {
      return await getAlbums(offset + 100);
    } else if (albumTitles.includes(guess)) {
      const album = albums.find(
        (album: any) => album.title.toLowerCase() === guess
      );
      if (!album) return false;

      return { cover: await getCover(album?.id), album };
    }
    {
      return false;
    }
  };
  return await getAlbums(0);
};

const getCover = async (albumId?: string) => {
  if (!albumId) return;
  const coverArtArchiveApi = new CoverArtArchiveApi();

  const coverArt = await coverArtArchiveApi.getReleaseGroupCovers(albumId);

  return coverArt.images[0].thumbnails[250];
};
