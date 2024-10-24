"use server";

import { MusicBrainzApi } from "musicbrainz-api";

export const checkMatches = async (query: string) => {
  const musicBrainzApi = new MusicBrainzApi({
    appName: "music-game",
    appVersion: "1.0.0",
    appContactInfo: "s.faulkner89@gmail.com",
  });

  const data = await musicBrainzApi.search("release-group", {
    query: `query="${query}" AND primary-type:album`,
    limit: 10,
    offset: 0,
    // inc: ["artists", "releases"],
  });

  console.log(data);

  return (data["release-groups"] ?? []).map((release: any) => release.title);
};
