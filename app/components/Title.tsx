import React from "react";

type Props = {
  children: string | string[] | any;
  small?: boolean;
  bold?: boolean;
  medium?: boolean;
  oneLine?: boolean;
  titleFont?: boolean;
  italic?: boolean;
  large?: boolean;
  pale?: boolean;
  size?: number | string;
  lineHeight?: number;
  color?: string;
  align?: "left" | "center" | "right";
  style?: React.CSSProperties;
};

export default function Title({
  children,
  small = false,
  bold = false,
  medium = false,
  oneLine = false,
  titleFont = false,
  italic = false,
  large = false,
  pale = false,
  size,
  lineHeight,
  color,
  align,
  style,
}: Props) {
  const isString = typeof size === "string";
  return (
    <div
      style={{
        fontSize:
          isString && size
            ? size
            : size
            ? size + "px"
            : small
            ? "14px"
            : medium
            ? "24px"
            : large
            ? "48px"
            : "20px",
        fontWeight: bold ? "bold" : "normal",
        fontFamily: titleFont ? "var(--font-title)" : "var(--font-body)",
        whiteSpace: oneLine ? "nowrap" : "normal",
        textOverflow: "ellipsis",
        lineHeight: lineHeight ? lineHeight : 4 / 3,
        textDecoration: italic ? "italic" : "none",
        color: color ? color : pale ? "var(--light-textTwo)" : "inherit",
        opacity: pale ? 0.7 : 1,
        textAlign: align ? align : "left",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
