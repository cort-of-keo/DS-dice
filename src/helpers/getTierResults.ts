import { useMemo } from "react";

import { Dice, isDice } from "../types/Dice";
import { Die, isDie } from "../types/Die";

import { getCombinedDiceValue } from "../helpers/getCombinedDiceValue";



export function getTierResults(
  dice: Dice,
  values: Record<string, number>,
  finalValue: number
) {
  
  /**
  const finalValue = useMemo(() => {
    return getCombinedDiceValue(dice, values);
  }, [dice, values]);
*/


  const d1 = dice.dice[0];
  const d2 = dice.dice[1];



  let tierResults: string[] = [];
  let intialTier: string = '';
  let finalTier: string = '';


  console.log(d1);
  console.log(dice);
  console.log(values);


  if (isDie(d1) && isDie(d2) && dice.dice.length === 2 && d1.type === "D210" && d2.type === "D210") {
    if (finalValue < 12) { 
      intialTier = 'Tier 1';
      finalTier = 'Tier 1';
    }else if (finalValue < 17) {
      intialTier = 'Tier 2';
      finalTier = 'Tier 2';
    }
    else {
      intialTier = 'Tier 3';
      finalTier = 'Tier 3';}
  }




  if (isDie(d1) && isDie(d2) && dice.dice.length === 2 && d1.type === "D210" && d2.type === "D210") {
    if (dice.dedge === "D EDGE"){
      if (finalValue < 12) { finalTier = 'Tier 2'}
      else if (finalValue < 17) { finalTier = 'Tier 3'}
      else {finalTier = 'Tier 3'} 
    } else if (dice.dedge === "D BANE") {
      if (finalValue > 17) { finalTier = 'Tier 2'}
      else if (finalValue > 12) { finalTier = 'Tier 1'}
      else {finalTier = 'Tier 1'} 
    } 
  }


  if (isDie(d1) && isDie(d2) && dice.dice.length === 2 && d1.type === "D210" && d2.type === "D210") {
    if ((values[d1.id] === 10 && values[d2.id] === 10) || (values[d1.id] === 9 && values[d2.id] === 10) || (values[d1.id] === 10 && values[d2.id] === 9) ) { finalTier = 'Critical!'}
    
  }

  tierResults = [intialTier, finalTier];


  return tierResults


}