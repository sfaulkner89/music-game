"use client";

import Image from "next/image";
import React, { useContext, useEffect } from "react";
import { ThemeContext } from "theme/theme";
import { keyframes, tss } from "tss-react";
import { Theme } from "types/theme.types";

type Props = {
  onClick: () => void;
  gridContent: { image?: string; guess: string } | null;
  loading?: boolean;
};

export default function GridSquare({ onClick, gridContent, loading }: Props) {
  const { theme } = useContext(ThemeContext);
  const { classes: s } = useStyles({ theme });

  return (
    <div
      className={s.container}
      // style={{ backgroundImage: gridContent?.image }}
      onClick={onClick}
    >
      {loading && <div className={s.spinner} />}
      {gridContent?.guess && (
        <div className={s.guess}>{gridContent?.guess}</div>
      )}
      {gridContent?.image && (
        <Image alt="butts" src={gridContent?.image} fill />
      )}
    </div>
  );
}

const useStyles = tss.withParams<{ theme: Theme }>().create(({ theme }) => {
  const spin = keyframes({
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  });

  return {
    container: {
      position: "relative",
      border: `1px solid ${theme.color.text}`,
      // borderTop: `2px solid ${theme.color.graphs.neonYellow}`,
      width: "min(200px, 20vw)",
      height: "min(200px, 20vw)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      backgroundColor: "white",
    },
    guess: {
      zIndex: 1,
      position: "absolute",
      bottom: 10,
      width: "90%",
      backgroundColor: theme.color.border,
      color: theme.color.text,
      textAlign: "center",
      padding: 5,
      borderRadius: 5,
      opacity: 0.8,
      fontSize: "calc(0.4em + 1vw)",
    },
    spinner: {
      border: "4px solid rgba(0, 0, 0, 0.1)",
      borderTop: `4px solid ${theme.color.graphs.neonYellow}`,
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      animation: `${spin} 1s linear infinite`,
    },
  };
});
