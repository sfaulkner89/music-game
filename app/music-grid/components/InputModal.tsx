"use client";

import { Autocomplete, Button, TextField } from "@mui/material";
import Flex from "app/components/Flex";
import Title from "app/components/Title";
import { checkMatches, matchGuess } from "app/music-grid/actions";
import { postValidateGuess, preValidateGuess } from "app/music-grid/utils";
import { artists, stipulations } from "constants/rules";
import React, { useContext, useEffect } from "react";
import { ThemeContext } from "theme/theme";
import { tss } from "tss-react";
import { Theme } from "types/theme.types";

type Props = {
  selected: { stipulation: number; artist: number } | null;
  close: () => void;
  setGridContent: React.Dispatch<
    React.SetStateAction<({ image?: string; guess: string } | null)[]>
  >;
  setLoading: (index: number | null) => void;
};

export default function InputModal({
  selected,
  close,
  setGridContent,
  setLoading,
}: Props) {
  const { theme } = useContext(ThemeContext);
  const { classes: s } = useStyles({ theme, open: !!selected });

  const [suggestions, setSuggestions] = React.useState<string[]>([]);

  const [lastFire, setLastFire] = React.useState(new Date().getTime());

  const [guess, setGuess] = React.useState<string | null>(null);

  const backgroundRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickOutside = (e: any) => {
      if (
        selected &&
        backgroundRef.current &&
        backgroundRef.current.contains(e.target as Node) &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };
    document.addEventListener("click", clickOutside);
    return () => document.removeEventListener("click", clickOutside);
  }, [selected]);

  if (!selected) return null;

  const changeHandler = async (e: any) => {
    if (new Date().getTime() - lastFire < 500 || e.target.value.length < 1) {
      return;
    }
    const results = await checkMatches(e.target.value);
    setSuggestions(results);
    setLastFire(new Date().getTime());
  };

  const match = async () => {
    if (guess === null || !selected) {
      return;
    }
    close();
    setLoading(selected.stipulation * 3 + selected.artist);
    const validGuess = preValidateGuess(
      guess,
      stipulations[selected.stipulation]
    );
    if (!validGuess) {
      setLoading(null);
      setGuess(null);
      return;
    }
    const correct = await matchGuess(
      guess.toLowerCase(),
      artists[selected.artist]
    );
    // console.log(correct);
    if (correct) {
      const validAlbum = postValidateGuess(
        correct.album,
        stipulations[selected.stipulation]
      );
      if (!validAlbum) {
        setLoading(null);
        setGuess(null);
        return;
      }
      setGridContent((prev) =>
        [...prev].map((item, i) =>
          i === selected.stipulation * 3 + selected.artist
            ? { image: correct.cover, guess: correct.album.title }
            : item
        )
      );
    }
    setLoading(null);
    setGuess(null);
  };

  return (
    <div className={s.background} ref={backgroundRef}>
      <div className={s.container} ref={containerRef}>
        <Title align="center" size={15} color={theme.color.text}>
          {artists[selected.artist]} x {stipulations[selected.stipulation]}
        </Title>
        <Autocomplete
          fullWidth
          renderInput={(p) => (
            <TextField {...p} onChange={changeHandler} fullWidth />
          )}
          value={guess}
          onChange={(e, v) => setGuess(v)}
          options={suggestions || []}
          getOptionKey={(option) => option + Math.random()}
        />
        <Button onClick={match} variant="contained">
          Select
        </Button>
      </div>
    </div>
  );
}

const useStyles = tss
  .withParams<{ theme: Theme; open: boolean }>()
  .create(({ theme, open }) => ({
    background: {
      position: "absolute",
      top: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: open ? "flex" : "none",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 100,
      flexDirection: "column",
    },
    container: {
      backgroundColor: theme.color.icon,
      width: "min(80%, 400px)",
      height: "min(80%, 400px)",
      display: "flex",
      flexDirection: "column",
      gap: 16,
      zIndex: 101,
      borderRadius: 10,
      padding: 8,
    },
  }));
