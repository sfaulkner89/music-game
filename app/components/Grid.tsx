import React from "react";

export default function Grid({
  children,
  gtc = "1fr 1fr",
  gap = 16,
  className,
  gtr,
  style,
  fill,
}: {
  children?: React.ReactNode;
  gtc?: string;
  gap?: number;
  className?: string;
  gtr?: string;
  style?: React.CSSProperties;
  fill?: boolean;
}) {
  return (
    <div
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: gtc,
        gap: gap + "px",
        gridTemplateRows: gtr,
        width: fill ? "100%" : "auto",
        borderCollapse: "collapse",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
