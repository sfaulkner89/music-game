"use client";

import Flex from "app/components/Flex";
import Grid from "app/components/Grid";
import Title from "app/components/Title";
import GridSquare from "app/music-grid/components/GridSquare";
import InputModal from "app/music-grid/components/InputModal";
import React, { Fragment, useContext } from "react";
import { ThemeContext } from "theme/theme";
import { tss } from "tss-react";
import { Theme } from "types/theme.types";

export default function Page() {
  const { theme } = useContext(ThemeContext);
  const { classes: s } = useStyles({ theme });

  const [input, setInput] = React.useState(false);

  const artists = ["The Beatles", "The Rolling Stones", "The Who"];
  const stipulations = [
    "Album Starts With 'A-G'",
    "Two Word Album",
    "Album Released in the 60s",
  ];

  function openInput(i: number, j: number) {
    setInput(true);
  }

  return (
    <div className={s.container}>
      <h1>Music Grid</h1>
      <Grid gtc="auto 1fr 1fr 1fr" className={s.grid} gap={0}>
        <div />
        {artists.map((artist, i) => (
          <Flex key={i} fill majorCenter>
            <Title size={20}>{artist}</Title>
          </Flex>
        ))}
        {stipulations.map((stipulation, i) => (
          <Fragment key={i}>
            <Flex fillHeight majorCenter center>
              <Title size={20}>{stipulation}</Title>
            </Flex>
            <GridSquare onClick={() => openInput(i, 0)} />
            <GridSquare onClick={() => openInput(i, 1)} />
            <GridSquare onClick={() => openInput(i, 2)} />
          </Fragment>
        ))}
      </Grid>
      <InputModal open={input} setOpen={setInput} />
    </div>
  );
}

const useStyles = tss.withParams<{ theme: Theme }>().create(({ theme }) => ({
  container: {
    width: "100%",
    height: "100vh",
    backgroundColor: theme.color.graphs.electricBlue,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  grid: {
    borderCollapse: "collapse",
  },
}));
