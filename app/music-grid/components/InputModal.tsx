"use client";

import { Autocomplete, Input, TextField } from "@mui/material";
import { checkMatches } from "app/music-grid/actions";
import React, { use, useContext, useEffect } from "react";
import { ThemeContext } from "theme/theme";
import { tss } from "tss-react";
import { Theme } from "types/theme.types";

export default function InputModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { theme } = useContext(ThemeContext);
  const { classes: s } = useStyles({ theme, open });

  const [suggestions, setSuggestions] = React.useState<string[]>([]);

  const [lastFire, setLastFire] = React.useState(new Date().getTime());

  useEffect(() => {
    console.log(suggestions);
  }, [suggestions]);

  const changeHandler = async (e: any) => {
    if (new Date().getTime() - lastFire < 500 || e.target.value.length < 3) {
      return;
    }
    const results = await checkMatches(e.target.value);
    setSuggestions(results);
    setLastFire(new Date().getTime());
  };

  return (
    <div className={s.background}>
      <div className={s.container}>
        <Autocomplete
          renderInput={(p) => <TextField {...p} onChange={changeHandler} />}
          options={suggestions || []}
          getOptionKey={(option) => option + Math.random()}
        />
      </div>
    </div>
  );
}

const useStyles = tss
  .withParams<{ theme: Theme; open: boolean }>()
  .create(({ theme, open }) => ({
    background: {
      position: "absolute",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: open ? "flex" : "none",
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      backgroundColor: theme.color.graphs.neonYellow,
      width: 400,
      height: 400,
    },
  }));
