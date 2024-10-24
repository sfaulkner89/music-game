import { CoverArtArchiveApi } from "musicbrainz-api";
import { NextResponse } from "next/server";

export const GET = async (albumId: string) => {
  const coverArtArchiveApi = new CoverArtArchiveApi();

  const coverArt = await coverArtArchiveApi.getReleaseGroupCovers(albumId);

  return NextResponse.redirect(coverArt.images[0].thumbnails[250]);
};
