import { DiceStyle } from "../types/DiceStyle";
import { Dsd3Material } from "./dsd3/Dsd3Material";
import { Dsd6Material } from "./dsd6/Dsd6Material";
import { Dsd10Material } from "./dsd10/Dsd10Material";
import { Ds2d10Material } from "./ds2d10/Ds2d10Material";


export function DiceMaterial({ diceStyle }: { diceStyle: DiceStyle }) {
  switch (diceStyle) {
    case "DSD10":
      return <Dsd10Material />;
    case "DS2D10":
        return <Ds2d10Material />;
    case "DSD6":
      return <Dsd6Material />;
    case "DSD3":
      return <Dsd3Material />;

    default:
      throw Error(`Dice style ${diceStyle} error: not implemented`);
  }
}
