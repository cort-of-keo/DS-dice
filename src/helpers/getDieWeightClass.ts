import { Die } from "../types/Die";
import { WeightClass } from "../types/WeightClass";

export function getDieWeightClass(die: Die): WeightClass {
  if (die.type === "D4") {
    return "LIGHT";
  } else {
    return "MEDIUM";
  }
}
