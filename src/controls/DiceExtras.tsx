import { useState } from "react";

import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";

import { DieChar } from "./DieChar";
import { DieBonus } from "./DieBonus";

import { DieBane } from "./DieBane";
import { DieEdge } from "./DieEdge";
import { DieSkill } from "./DieSkill";
import { useDiceControlsStore } from "./store";
import { useDiceRollStore } from "../dice/store";

import { DieDedge } from "./DieDedge";

export function DiceExtras() {
  const bonus = useDiceControlsStore((state) => state.diceBonus);
  const setBonus = useDiceControlsStore((state) => state.setDiceBonus);
  const char = useDiceControlsStore((state) => state.diceChar);
  const setChar = useDiceControlsStore((state) => state.setDiceChar);
  const dedge = useDiceControlsStore((state) => state.diceDedge);
  const setDedge = useDiceControlsStore((state) => state.setDiceDedge);
  const edge = useDiceControlsStore((state) => state.diceEdge);
  const setEdge = useDiceControlsStore((state) => state.setDiceEdge);
  const bane = useDiceControlsStore((state) => state.diceBane);
  const setBane = useDiceControlsStore((state) => state.setDiceBane);
  const skill = useDiceControlsStore((state) => state.diceSkill);
  const setSkill = useDiceControlsStore((state) => state.setDiceSkill);
  const clearRoll = useDiceRollStore((state) => state.clearRoll);
  const roll = useDiceRollStore((state) => state.roll);
  function clearRollIfNeeded() {
    if (roll) {
      clearRoll();
    }
  }

  /** Controls (char score, double edge/bane, edge/bane, and skilled) */
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <>
      <Tooltip title="Bonus" placement="top" disableInteractive>
        <IconButton
          aria-label="more"
          id="more-button"
          aria-controls={open ? "more-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{ fontSize: "18px" }}
        >
          <span style={{ width: "24px", height: "24px" }}>+/-</span>
        </IconButton>
      </Tooltip>
      <Menu
        id="more-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "more-button",
        }}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
      >
        <Stack>
          <DieChar
            bonus={bonus}
            char={char}
            onChange={(bonus) => {
              setBonus(bonus);
              setChar(char);
              clearRollIfNeeded();
            }}
            onIncrease={() => {
              setBonus(bonus + 1);
              setChar(char + 1);
              clearRollIfNeeded();
            }}
            onDecrease={() => {
              setBonus(bonus - 1);
              setChar(char - 1);
              clearRollIfNeeded();
            }}
          />
          <Divider variant="middle" />
          <DieDedge



            dedge={dedge}
            onChange={(dedge) => {
              setDedge(dedge);
              clearRollIfNeeded();
            }}
          />
          <Divider variant="middle" />
          <DieEdge
            edge={edge}
            onChange={(edge) => {
              if (edge === null){
                setBonus(bonus - 2);
              }
              else if (edge === "EDGE"){
                setBonus(bonus + 2)
                //setBane(null);
              }
              setEdge(edge);
              clearRollIfNeeded();
            }}
          />
          <Divider variant="middle" />
          <DieBane
            bane={bane}
            onChange={(bane) => {
              if (bane === null){
                setBonus(bonus + 2);
              }
              else if (bane === "BANE"){
                setBonus(bonus - 2);
                //setEdge(null);
              }
              setBane(bane);
              clearRollIfNeeded();
            }}
          />
           <Divider variant="middle" />
          <DieSkill
            skill={skill}
            onChange={(skill) => {
              if (skill === null ){
                setBonus(bonus - 2);
              }
              else if (skill === "SKILL"){
                setBonus(bonus + 2);
              }
              setSkill(skill);
              clearRollIfNeeded();
            }}
          />
        </Stack>
      </Menu>
    </>
  );
}
