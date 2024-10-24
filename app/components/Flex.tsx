import React from "react";

type Props = {
  children: React.ReactNode[] | React.ReactNode;
  gap?: number;
  vertical?: boolean;
  center?: boolean;
  className?: string;
  spaceBetween?: boolean;
  fill?: boolean;
  fillHeight?: boolean;
  flexEnd?: boolean;
  flexEndMinor?: boolean;
  majorCenter?: boolean;
  spaceAround?: boolean;
  onClick?: (thing?: any) => void;
  forwardId?: string;
  style?: React.CSSProperties;
};

export default function Flex({
  children,
  gap = 16,
  vertical,
  center = false,
  className,
  spaceBetween = false,
  fill = false,
  fillHeight = false,
  flexEnd = false,
  flexEndMinor = false,
  majorCenter = false,
  spaceAround = false,
  forwardId,
  style,
  onClick,
}: Props) {
  return (
    <div
      onClick={onClick}
      id={forwardId}
      className={className}
      style={{
        display: "flex",
        cursor: onClick ? "pointer" : "default",
        gap: gap + "px",
        width: fill ? "100%" : "auto",
        height: fillHeight ? "100%" : undefined,
        flexDirection: vertical ? "column" : "row",
        alignItems: center ? "center" : flexEnd ? "flex-end" : "flex-start",
        justifyContent: majorCenter
          ? "center"
          : spaceBetween
          ? "space-between"
          : spaceAround
          ? "space-around"
          : flexEndMinor
          ? "flex-end"
          : "flex-start",
        ...(style || {}),
      }}
    >
      {children}
    </div>
  );
}
