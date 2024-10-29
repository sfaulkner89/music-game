"use client";

import Flex from "app/components/Flex";
import Grid from "app/components/Grid";
import Title from "app/components/Title";
import GridSquare from "app/music-grid/components/GridSquare";
import InputModal from "app/music-grid/components/InputModal";
import { artists, stipulations } from "constants/rules";
import React, { Fragment, useContext, useEffect } from "react";
import { ThemeContext } from "theme/theme";
import { tss } from "tss-react";
import { Theme } from "types/theme.types";

export default function Page() {
  const { theme } = useContext(ThemeContext);
  const { classes: s } = useStyles({ theme });

  const [selected, setSelected] = React.useState<{
    stipulation: number;
    artist: number;
  } | null>(null);

  const [guessesLeft, setGuessesLeft] = React.useState(10);

  const [gridContent, setGridContent] = React.useState<
    ({ image?: string; guess: string } | null)[]
  >(Array.from({ length: 9 }, () => null));

  const [loading, setLoading] = React.useState<number | null>(null);

  function openInput(i: number, j: number) {
    setSelected({ stipulation: i, artist: j });
  }

  return (
    <div className={s.container}>
      <Title size={25} titleFont>
        Music Grid
      </Title>
      <Grid gtc="auto 1fr 1fr 1fr" className={s.grid} gap={0}>
        <div />
        {artists.map((artist, i) => (
          <Flex key={i} fill majorCenter flexEnd className={s.title}>
            <Title size={12} style={{ textAlign: "center", marginBottom: 10 }}>
              {artist}
            </Title>
          </Flex>
        ))}
        {stipulations.map((stipulation, i) => (
          <Fragment key={i}>
            <Flex fillHeight majorCenter center className={s.title}>
              <Title size={12} style={{ textAlign: "center", marginRight: 10 }}>
                {stipulation}
              </Title>
            </Flex>
            <GridSquare
              loading={loading === 3 * i}
              onClick={() => openInput(i, 0)}
              gridContent={gridContent[3 * i]}
            />
            <GridSquare
              loading={loading === 3 * i + 1}
              onClick={() => openInput(i, 1)}
              gridContent={gridContent[3 * i + 1]}
            />
            <GridSquare
              loading={loading === 3 * i + 2}
              onClick={() => openInput(i, 2)}
              gridContent={gridContent[3 * i + 2]}
            />
          </Fragment>
        ))}
      </Grid>
      <Title size={14}>Guesses Left: {guessesLeft}</Title>
      <InputModal
        setLoading={setLoading}
        selected={selected}
        close={() => setSelected(null)}
        setGridContent={setGridContent}
      />
    </div>
  );
}

const useStyles = tss.withParams<{ theme: Theme }>().create(({ theme }) => ({
  container: {
    width: "100%",
    height: "100vh",
    backgroundColor: theme.color.dark,
    display: "flex",
    flexDirection: "column",
    paddingTop: 60,
    // justifyContent: "center",
    alignItems: "center",
    gap: 32,
  },
  grid: {
    borderCollapse: "collapse",
    width: "min(100%, 800px)",
  },
  title: {
    maxWidth: "min(200px, 20vw)",
    maxHeight: "min(200px, 20vw)",
    display: "flex",
  },
}));
