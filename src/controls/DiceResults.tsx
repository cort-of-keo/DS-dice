import { useMemo } from "react";

import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Grow from "@mui/material/Grow";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

import { getCombinedDiceValue } from "../helpers/getCombinedDiceValue";
import { getTierResults } from "../helpers/getTierResults";

import { DiceRoll } from "../types/DiceRoll";
import { Die, isDie } from "../types/Die";
import { Dice, isDice } from "../types/Dice";
import { DicePreview } from "../previews/DicePreview";

export function DiceResults({
  diceRoll,
  rollValues,
  expanded,
  onExpand,
}: {
  diceRoll: DiceRoll;
  rollValues: Record<string, number>;
  expanded: boolean;
  onExpand: (expand: boolean) => void;
}) {
 
  const finalValue = useMemo(() => {
    return getCombinedDiceValue(diceRoll, rollValues);
  }, [diceRoll, rollValues]);

 
  const tiers = useMemo(() => {
    return getTierResults(diceRoll, rollValues, finalValue);
  }, [diceRoll, rollValues]);
  



 // const die = useMemo(() => {diceRoll.dice.filter(isDie).sort((a,b) => 0)}, [diceRoll,rollValues]);

 


 // console.log(die);
  console.log(diceRoll);
  console.log(rollValues);
 //console.log(tiers);

  return (
    <Stack alignItems="center" maxHeight="calc(100vh - 100px)">
      <Tooltip
        title={expanded ? "Hide Breakdown" : "Show Breakdown"}
        disableInteractive
      >
        <Button
          sx={{ pointerEvents: "all", padding: 0.5, minWidth: "40px" }}
          onClick={() => onExpand(!expanded)}
          color="inherit"
        >
          <Typography variant="h4" color="white">
            {finalValue}
          </Typography>
          <Typography variant="h4" color="white">
          &nbsp;
          </Typography>
          <Typography variant="h4" color="white">
            {tiers[1]}
          </Typography>
        </Button>
      </Tooltip>
      <Grow
        in={expanded}
        mountOnEnter
        unmountOnExit
        style={{ transformOrigin: "50% 0 0" }}
      >
        <Stack overflow="auto" sx={{ pointerEvents: "all" }}>
          <DiceResultsExpanded diceRoll={diceRoll} rollValues={rollValues} tiers={tiers} />
        </Stack>
      </Grow>
    </Stack>
  );
}





function combination(dice: Dice) {
  if (dice.dedge === "D EDGE") {
    return ">";
  } else if (dice.dedge === "D BANE") {
    return "<";
  } 
   else {
    return "+";
  }
}

function sortDice(
  die: Die[],
  rollValues: Record<string, number>,
  combination: "D EDGE" | "D BANE" | null | undefined
) {
  return die.sort((a, b) => {
    const aValue = rollValues[a.id];
    const bValue = rollValues[b.id];
    if (combination === "D EDGE") {
      return bValue - aValue;
    } else if (combination === "D BANE") {
      return aValue - bValue;
    } else {
      return 0;
    }
  });
}

function DiceResultsExpanded({
  diceRoll,
  rollValues,
  tiers
}: {
  diceRoll: DiceRoll;
  rollValues: Record<string, number>;
  tiers: string[];
}) {
  const die = useMemo(
    () =>
      sortDice(diceRoll.dice.filter(isDie), rollValues, diceRoll.dedge),
    [diceRoll, rollValues]
  );
  const dice = useMemo(() => diceRoll.dice.filter(isDice), [diceRoll]);
 
  console.log(die);
  console.log(dice);

  



  return (
    <Stack divider={<Divider />} gap={1}>
      <Stack direction="row" flexWrap="wrap" gap={1} justifyContent="center">
        {die.map((d, i) => (
          <Stack direction="row" key={d.id} gap={1}>
            <DicePreview diceStyle={d.style} diceType={d.type} size="small" />
            <Typography lineHeight="28px" color="white">
              {rollValues[d.id]}
            </Typography>
            {i < die.length - 1 && (
              <Typography lineHeight="28px" color="white">
                +
              </Typography>
            )}
          </Stack>
        ))}
        {die.length > 0 && (
          <>
            <Typography lineHeight="28px" color="white">
              =
            </Typography>
            <Typography lineHeight="28px" color="white">
              {getCombinedDiceValue(
                { dice: die, dedge: diceRoll.dedge },
                rollValues
              )}
            </Typography>
          </>
        )}
      </Stack>
      {dice.map((d, i) => (
        <DiceResultsExpanded key={i} diceRoll={d} rollValues={rollValues} tiers={tiers} />
      ))}
      {diceRoll.bonus && (
        <Typography textAlign="center" lineHeight="28px" color="white">
          {diceRoll.bonus > 0 && "+"}
          {diceRoll.bonus}
        </Typography>
      )}
      {diceRoll.dedge && (
        <>
        <Typography textAlign="center" lineHeight="28px" color="white">
        Initial Tier:
        &nbsp;
        {tiers[0]}
      </Typography>
      <Typography textAlign="center" lineHeight="28px" color="white">
      {<KeyboardDoubleArrowDownIcon />}
      </Typography>
      <Typography textAlign="center" lineHeight="28px" color="white">
        Final Tier:
        &nbsp;
        {tiers[1]}
      </Typography>
      </>
      )}
      

    </Stack>
  );
}
