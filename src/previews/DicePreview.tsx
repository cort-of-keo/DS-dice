import { styled } from "@mui/material/styles";

import { DiceStyle } from "../types/DiceStyle";
import { DiceType } from "../types/DiceType";

import * as dsd3Previews from "./dsd3";
import * as dsd6Previews from "./dsd6";
import * as dsd10Previews from "./dsd10";
import * as ds2d10Previews from "./ds2d10";
import { prepare } from "@react-three/fiber/dist/declarations/src/core/renderer";

const previews: Record<DiceStyle, Record<DiceType, string>> = {
  DSD3: dsd3Previews,
  DSD6: dsd6Previews,
  DSD10: dsd10Previews,
  DS2D10: ds2d10Previews,
};
 

interface PreviewImageProps {
  size?: "small" | "medium" | "large";
}



const PreviewImage = styled("img", {
  shouldForwardProp: (prop) => prop !== "size",
})<PreviewImageProps>(({ size }) => ({
  width: size === "small" ? "28px" : size === "medium" ? "34px" : "38px",
  height: size === "small" ? "28px" : size === "medium" ? "34px" : "38px",
}));


type DiePreviewProps = {
  diceType: DiceType;
  diceStyle: DiceStyle;
  size?: "small" | "medium" | "large";
};

export function DicePreview({ diceType, diceStyle, size }: DiePreviewProps) {
  return (
    <PreviewImage
      src={previews[diceStyle][diceType]}
      alt={`${diceStyle} ${diceType} preview`}
      size={size}
    />
  );
}
