import { Dice, isDice } from "../types/Dice";
import { isDie } from "../types/Die";

/**
 * Check if the dice is a classical D100 roll with a D100
 * for the 10s unit and a D10 for the single digit.
 * If it is return the combined result.
 */
function checkD100Combination(
  dice: Dice,
  values: Record<string, number>
): number | null {
  const bonus = dice.bonus || 0;
  if (
    dice.dice.length === 2 &&
    (dice.combination === undefined || dice.combination === "SUM")
  ) {
    const d1 = dice.dice[0];
    const d2 = dice.dice[1];
    if (isDie(d1) && isDie(d2) && d1.type === "D100" && d2.type === "D10") {
      const v1 = values[d1.id];
      const v2 = values[d2.id];
      if (v1 !== undefined && v2 !== undefined) {
        if (v1 === 0 && v2 === 0) {
          return 100 + bonus;
        } else {
          return v1 + v2 + bonus;
        }
      }
    }
  }
  return null;
}

/**
 * Recursively get the final result for a roll of dice
 * @param dice
 * @param values A mapping of Die ID to their rolled value
 * @returns
 */
export function getCombinedDiceValue(
  dice: Dice,
  values: Record<string, number>
): number | null {
  // Handle special case for D100 combinations
  const d100Value = checkD100Combination(dice, values);
  if (d100Value !== null) {
    return d100Value;
  }

  // Initialize stack with the root dice, carrying its combination and dbane
  const stack: { dice: Dice; combination?: "HIGHEST" | "LOWEST" | "SUM" | "NONE"; dbane?: "D EDGE" | "D BANE" | null }[] = [
    { dice, combination: dice.combination, dbane: dice.dbane }
  ];

  const currentValues: number[] = [];
  let finalDbane: "D EDGE" | "D BANE" | null = null; // Use a separate variable to track dbane

  // Iteratively process all dice using the stack
  while (stack.length > 0) {
    const { dice: currentDice, combination, dbane } = stack.pop()!; // Get the current dice and its properties
    finalDbane = dbane ?? finalDbane; // Maintain the final dbane value
    const tempValues: number[] = []; // Temporary array to store current roll values

    // Debugging to confirm `dbane` is carried through correctly
    //console.log(`Processing Dice:`, JSON.stringify(currentDice, null, 2));
    //console.log(`Current dbane: ${dbane}`);

    // Iterate over the dice in the current Dice object
    for (const dieOrDice of currentDice.dice) {
      if (isDie(dieOrDice)) {
        const value = values[dieOrDice.id];
        if (value !== undefined) {
          // Special handling for D10 rolling 0
          tempValues.push(dieOrDice.type === "D10" && value === 0 ? 10 : value);
        }
      } else if (isDice(dieOrDice)) {
        // Push nested Dice onto the stack with inherited combination and dbane
        stack.push({
          dice: dieOrDice,
          combination: dieOrDice.combination ?? combination,
          dbane: dieOrDice.dbane ?? dbane, // Ensure `dbane` is correctly inherited
        });
      }
    }

    // Apply the combination logic
    if (combination === "HIGHEST" && tempValues.length === 2) {
      // Correctly handle HIGHEST: choose the maximum of two values
      currentValues.push(Math.max(...tempValues));
    } else if (combination === "LOWEST" && tempValues.length === 2) {
      // Correctly handle LOWEST: choose the minimum of two values
      currentValues.push(Math.min(...tempValues));
    } else {
      // For SUM and NONE, add all values directly
      currentValues.push(...tempValues);
    }
  }

  // Apply bonus or default to 0
  const bonus = dice.bonus ?? 0;
  const total = currentValues.reduce((a, b) => a + b, 0) + bonus;

  // Debugging outputs to trace values and ensure dbane is evaluated
  //console.log(`Final currentValues: ${currentValues}, total: ${total}, bonus: ${bonus}, final dbane: ${finalDbane}`);

  // Handle D EDGE and D BANE conditions explicitly without being skipped
  if (finalDbane === "D EDGE") {
    console.log("Handling D EDGE condition");
    if (total < 12) {
      console.log("Returning 12 for D EDGE");
      return 12;
    }
    if (total < 17) {
      console.log("Returning 17 for D EDGE");
      return 17;
    }
    return total;
  }

  if (finalDbane === "D BANE") {
    console.log("Handling D BANE condition");
    if (total > 17) {
      console.log("Returning 16 for D BANE");
      return 16;
    }
    if (total > 12) {
      console.log("Returning 11 for D BANE");
      return 11;
    }
    return total;
  }

  // Default case: sum of values plus bonus
  return total;
}

