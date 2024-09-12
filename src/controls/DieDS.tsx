import { useEffect, useState } from "react";

import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Stack from "@mui/material/Stack";

import IncreaseIcon from "@mui/icons-material/AddCircleOutlineRounded";
import DecreaseIcon from "@mui/icons-material/RemoveCircleOutlineRounded";

type DieDSProps = {
  char: number;
  bonus: number;
  onChange: (bonus: number) => void;
  //onChangechar: (char: number) => void;
  onIncrease: () => void;
  onDecrease: () => void;
  //onIncreasechar: () => void;
  //onDecreasechar: () => void;
};

export function DieDS({
  char,
  //onChangechar,
  bonus,
  onChange,
  onIncrease,
  onDecrease,
  //onIncreasechar,
  //onDecreasechar,
}: DieDSProps) {
  const [charString, setCharString] = useState(`${char}`);
  const [bonusString, setBonusString] = useState(`${bonus}`);
  
  useEffect(() => {
    setBonusString(`${bonus}`);
  }, [bonus]);

  useEffect(() => {
    setCharString(`${char}`);
  }, [char]);

  return (
    <ListItem disablePadding>
      <ListItemButton sx={{ cursor: "inherit" }}>
        <ListItemIcon sx={{ minWidth: "38px", justifyContent: "center" }}>
          Characteristic Score
        </ListItemIcon>
        <ListItemText sx={{ marginRight: "88px" }}>
          <Input
            disableUnderline
            inputProps={{
              sx: {
                textAlign: "center",
              },
            }}
            value={charString}
            onChange={(e) => {
              setBonusString(e.target.value);
              const newChar = parseInt(e.target.value);
              if (!isNaN(newChar)) {
                onChange(newChar);
              }
            }}
            onBlur={(e) => {
              const currentChar = parseInt(e.target.value);
              if (isNaN(currentChar)) {
                onChange(0);
                setBonusString("0");
              }
            }}
            fullWidth
          />
        </ListItemText>
        <ListItemSecondaryAction>
          <Stack gap={1} direction="row">
            <IconButton
              aria-label="decrease bonus"
              onClick={() => onDecrease() }
              
            >
              <DecreaseIcon />
            </IconButton>
            <IconButton
              aria-label="increase bonus"
              onClick={() => onIncrease()}
              
            >
              <IncreaseIcon />
            </IconButton>
          </Stack>
        </ListItemSecondaryAction>
      </ListItemButton>
    </ListItem>
  );
}
