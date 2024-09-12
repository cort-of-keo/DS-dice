import { DiceSet } from "../types/DiceSet";
import { DiceStyle } from "../types/DiceStyle";
import { Die } from "../types/Die";
import { DiceType} from "../types/DiceType";

import * as dsd3Previews from "../previews/dsd3";
import * as dsd6Previews from "../previews/dsd6";
import * as dsd10Previews from "../previews/dsd10";
import * as ds2d10Previews from "../previews/ds2d10";

import allPreview from "../previews/all.png";

const standardPreviews: Record<DiceStyle, string> = {
  DSD3: dsd3Previews.D3,
  DSD6: dsd6Previews.D6,
  DSD10: dsd10Previews.D10,
  DS2D10: ds2d10Previews.D210,
};

function createStandardSet(style: DiceStyle): DiceSet {
  let id: string;
  let diceType: DiceType; // Change the type to DiceType
  switch (style) {
    case "DSD3":
      id = "DSD3_STANDARD";
      diceType = "D3"; // Use a valid DiceType value
      break;
    case "DSD6":
      id = "DSD6_STANDARD";
      diceType = "D6";
      break;
    case "DSD10":
      id = "DSD10_STANDARD";
      diceType = "D10";
      break;
    case "DS2D10":
      id = "DS2D10_STANDARD";
      diceType = "D210";
      break;
    default:
      // Handle any other cases or invalid styles here.
      id = "unknown_STANDARD";
      diceType = "D6"; // You can change this default value as needed.
  }

  return {
    id,
    name: `${style.toLowerCase()} dice`,
    dice: [
      { id: `${id}_${diceType}`, type: diceType, style },
    ],
    previewImage: standardPreviews[style],
  };
}

const standardSets: DiceSet[] = [
  createStandardSet("DSD3"),
  createStandardSet("DSD6"),
  createStandardSet("DSD10"),
  createStandardSet("DS2D10"),
];

const allSet: DiceSet = {
  id: "all",
  name: "all",
  dice: standardSets.reduce(
    (prev, curr) => [...prev, ...curr.dice],
    [] as Die[]
  ),
  previewImage: allPreview,
};

export const diceSets: DiceSet[] = [...standardSets, allSet];
