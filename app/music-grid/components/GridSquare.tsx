"use client";

import React, { useContext } from "react";
import { ThemeContext } from "theme/theme";
import { tss } from "tss-react";
import { Theme } from "types/theme.types";

type Props = {
  onClick: () => void;
};

export default function GridSquare({ onClick }: Props) {
  const { theme } = useContext(ThemeContext);
  const { classes: s } = useStyles({ theme });

  return <div className={s.container} onClick={onClick}></div>;
}

const useStyles = tss.withParams<{ theme: Theme }>().create(({ theme }) => ({
  container: {
    border: `2px solid ${theme.color.graphs.neonYellow}`,
    borderTop: `2px solid ${theme.color.graphs.neonYellow}`,
    width: 200,
    height: 200,
  },
}));
