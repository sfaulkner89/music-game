import { IReleaseGroup, IReleaseGroupMatch } from "musicbrainz-api";
import { STIPULATIONS } from "types/general.types";

export const preValidateGuess = (guess: string, stipulation: STIPULATIONS) => {
  if (guess.split(" ")[0].toLowerCase() === "the") {
    guess = guess.split(" ").slice(1).join(" ");
  }

  console.log(guess, stipulation);

  switch (stipulation) {
    case STIPULATIONS.A_G:
      return guess[0].toUpperCase() >= "A" && guess[0].toUpperCase() <= "G";
    case STIPULATIONS.H_N:
      return guess[0].toUpperCase() >= "H" && guess[0].toUpperCase() <= "N";
    case STIPULATIONS.O_U:
      return guess[0].toUpperCase() >= "O" && guess[0].toUpperCase() <= "U";
    case STIPULATIONS.V_Z:
      return guess[0].toUpperCase() >= "V" && guess[0].toUpperCase() <= "Z";
    case STIPULATIONS.ONE_WORD_ALBUM:
      return guess.split(" ").length === 1;
    case STIPULATIONS.TWO_WORD_ALBUM:
      return guess.split(" ").length === 2;
    case STIPULATIONS.THREE_WORD_ALBUM:
      return guess.split(" ").length === 3;
    case STIPULATIONS.FOUR_WORD_ALBUM:
      return guess.split(" ").length === 4;
    default:
      return true;
  }
};

export const postValidateGuess = (
  album: IReleaseGroup,
  stipulation: STIPULATIONS
) => {
  console.log(stipulation);
  console.log(album["first-release-date"].slice(0, 3));
  switch (stipulation) {
    case STIPULATIONS.SIXTIES:
      return album["first-release-date"].slice(0, 3) === "196";
    case STIPULATIONS.SEVENTIES:
      return album["first-release-date"].slice(0, 3) === "197";
    case STIPULATIONS.EIGHTIES:
      return album["first-release-date"].slice(0, 3) === "198";
    case STIPULATIONS.NINETIES:
      return album["first-release-date"].slice(0, 3) === "199";
    case STIPULATIONS.TWO_THOUSANDS:
      return album["first-release-date"].slice(0, 3) === "200";
    case STIPULATIONS.TWENTY_TENS:
      return album["first-release-date"].slice(0, 3) === "201";
    case STIPULATIONS.TWENTY_TWENTIES:
      return album["first-release-date"].slice(0, 3) === "202";
    default:
      return true;
  }
};
