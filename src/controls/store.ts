import create from "zustand";
import { immer } from "zustand/middleware/immer";
import { diceSets } from "../sets/diceSets";
import { Dice } from "../types/Dice";
import { DiceSet } from "../types/DiceSet";
import { Die } from "../types/Die";
import { generateDiceId } from "../helpers/generateDiceId";

export type Advantage = "ADVANTAGE" | "DISADVANTAGE" | null;
export type Dedge = "D EDGE" | "D BANE" | null;
export type Dbane = "D EDGE" | "D BANE" | null;
export type Edge =  "EDGE" | null;
export type Bane =  "BANE" | null;
export type Skill = "SKILL" | null;
export type Power = "POWER" | null;
export type DiceCounts = Record<string, number>;

interface DiceControlsState {
  diceSet: DiceSet;
  diceById: Record<string, Die>;
  defaultDiceCounts: DiceCounts;
  diceCounts: DiceCounts;
  diceBonus: number;
  diceChar: number;
  diceEdgebonus: number;
  diceSkillbonus: number;
  diceAdvantage: Advantage;
  diceDedge: Dedge;
  diceDbane: Dbane;
  diceEdge: Edge;
  diceBane: Bane;
  diceSkill: Skill;
  dicePower: Power;
  diceHidden: boolean;
  diceRollPressTime: number | null;
  fairnessTesterOpen: boolean;
  changeDiceSet: (diceSet: DiceSet) => void;
  resetDiceCounts: () => void;
  changeDieCount: (id: string, count: number) => void;
  incrementDieCount: (id: string) => void;
  decrementDieCount: (id: string) => void;
  setDiceAdvantage: (advantage: Advantage) => void;
  setDiceDedge: (dedge: Dedge) => void;
  setDiceDbane: (dbane: Dbane) => void;
  setDiceEdge: (edge: Edge) => void;
  setDiceBane: (bane: Bane) => void;
  setDiceSkill: (skill: Skill) => void;
  setDicePower: (power: Power) => void;
  setDiceBonus: (bonus: number) => void;
  setDiceChar: (char: number) => void;
  setDiceEdgebonus: (edgebonus: number) => void;
  setDiceSkillbonus: (skillbonus: number) => void;
  toggleDiceHidden: () => void;
  setDiceRollPressTime: (time: number | null) => void;
  toggleFairnessTester: () => void;
}

const initialSet = diceSets[0];
const initialDiceCounts = getDiceCountsFromSet(initialSet);
const initialDiceById = getDiceByIdFromSet(initialSet);

export const useDiceControlsStore = create<DiceControlsState>()(
  immer((set) => ({
    diceSet: initialSet,
    diceById: initialDiceById,
    defaultDiceCounts: initialDiceCounts,
    diceCounts: initialDiceCounts,
    diceBonus: 0,
    diceChar: 0,
    diceEdgebonus: 0,
    diceSkillbonus: 0,
    diceAdvantage: null,
    diceDedge: null,
    diceDbane: null,
    diceEdge: null,
    diceBane: null,
    diceSkill: null,
    dicePower: null,
    diceHidden: false,
    diceRollPressTime: null,
    fairnessTesterOpen: false,
    changeDiceSet(diceSet) {
      set((state) => {
        const counts: DiceCounts = {};
        const prevCounts = state.diceCounts;
        const prevDice = state.diceSet.dice;
        for (let i = 0; i < diceSet.dice.length; i++) {
          const die = diceSet.dice[i];
          const prevDie = prevDice[i];
          // Carry over count if the index and die type match
          if (prevDie && prevDie.type === die.type) {
            counts[die.id] = prevCounts[prevDie.id] || 0;
          } else {
            counts[die.id] = 0;
          }
        }
        state.diceCounts = counts;
        state.diceSet = diceSet;
        state.defaultDiceCounts = getDiceCountsFromSet(diceSet);
        state.diceById = getDiceByIdFromSet(diceSet);
      });
    },
    resetDiceCounts() {
      set((state) => {
        state.diceCounts = state.defaultDiceCounts;
      });
    },
    changeDieCount(id, count) {
      set((state) => {
        if (id in state.diceCounts) {
          state.diceCounts[id] = count;
        }
      });
    },
    incrementDieCount(id) {
      set((state) => {
        if (id in state.diceCounts) {
          state.diceCounts[id] += 1;
        }
      });
    },
    decrementDieCount(id) {
      set((state) => {
        if (id in state.diceCounts) {
          state.diceCounts[id] -= 1;
        }
      });
    },
    setDiceBonus(bonus) {
      set((state) => {
        state.diceBonus = bonus;
      });
    },
    setDiceChar(char) {
      set((state) => {
        state.diceChar = char;
      });
    },
    setDiceEdgebonus(edgebonus) {
      set((state) => {
        state.diceEdgebonus = edgebonus;
      });
    },
    setDiceSkillbonus(skillbonus) {
      set((state) => {
        state.diceSkillbonus = skillbonus;
      });
    },
    setDiceAdvantage(advantage) {
      set((state) => {
        state.diceAdvantage = advantage;
      });
    }, 
    setDiceDedge(dedge) {
      set((state) => {
        state.diceDedge = dedge;
      });
    },
    setDiceDbane(dbane) {
      set((state) => {
        state.diceDbane = dbane;
      });
    },
    setDiceEdge(edge) {
      set((state) => {
        state.diceEdge = edge;
      });
    },
    setDiceBane(bane) {
      set((state) => {
        state.diceBane = bane;
      });
    },
    setDiceSkill(skill) {
      set((state) => {
        state.diceSkill = skill;
      });
    },
    setDicePower(power) {
      set((state) => {
        state.dicePower = power;
      });
    },
    toggleDiceHidden() {
      set((state) => {
        state.diceHidden = !state.diceHidden;
      });
    },
    setDiceRollPressTime(time) {
      set((state) => {
        state.diceRollPressTime = time;
      });
    },
    toggleFairnessTester() {
      set((state) => {
        state.fairnessTesterOpen = !state.fairnessTesterOpen;
      });
    },
  }))
);

function getDiceCountsFromSet(diceSet: DiceSet) {
  const counts: Record<string, number> = {};
  for (const die of diceSet.dice) {
    counts[die.id] = 0;
  }
  return counts;
}

function getDiceByIdFromSet(diceSet: DiceSet) {
  const byId: Record<string, Die> = {};
  for (const die of diceSet.dice) {
    byId[die.id] = die;
  }
  return byId;
}

/** Generate new dice based off of a set of counts, advantage and die */
export function getDiceToRoll(
  counts: DiceCounts,
  advantage: Advantage,
  dedge: Dedge,
  power: Power,
  diceById: Record<string, Die>
) {
  const dice: (Die | Dice)[] = [];
  const countEntries = Object.entries(counts);
  for (const [id, count] of countEntries) {
    const die = diceById[id];
    if (!die) {
      continue;
    }
    const { style, type } = die;
    for (let i = 0; i < count; i++) {
      
      if (advantage === null) {
        if (type === "D100") {
          // Push a d100 and d10 when rolling a d100
          dice.push({
            dice: [
              { id: generateDiceId(), style, type: "D100" },
              { id: generateDiceId(), style, type: "D10" },
            ],
          });
        } else {
          const dbane = dedge;
          dice.push({ id: generateDiceId(), style, type, dbane });
        }
      } else {
        // Rolling with advantage or disadvantage
        const combination = advantage === "ADVANTAGE" ? "HIGHEST" : "LOWEST";
        if (type === "D100") {
          // Push 2 d100s and d10s
          dice.push({
            dice: [
              {
                dice: [
                  { id: generateDiceId(), style, type: "D100" },
                  { id: generateDiceId(), style, type: "D10" },
                ],
              },
              {
                dice: [
                  { id: generateDiceId(), style, type: "D100" },
                  { id: generateDiceId(), style, type: "D10" },
                ],
              },
            ],
            combination,
          });
        } else {
          dice.push({
            dice: [
              { id: generateDiceId(), style, type },
              { id: generateDiceId(), style, type },
            ],
            combination,
          });
        }
      }
    }
  }
  return dice;
}
