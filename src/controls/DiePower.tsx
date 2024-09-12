import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

type DiePowerProps = {
  
  power?: "POWER" | null;
  onChange: (power: "POWER" | null) => void;
  
};

export function DiePower({ power, onChange }: DiePowerProps) {
  return (
    <ToggleButtonGroup
      color="primary"
      value={power}
      exclusive
      onChange={(_, value) => {
        onChange(value);
      }}
      aria-label="Power Roll"
      fullWidth
      sx={{
        borderRadius: 0,
        py: 1,
        ".MuiToggleButton-root": { borderRadius: 0 },
      }}
    >
       
     
      <ToggleButton value="POWER" 
        sx={{ borderWidth: 0, borderRightWidth: 1 }}
      >
        Power Roll
      </ToggleButton>
     
      
    </ToggleButtonGroup>
  );
}