import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

type DieBaneProps = {
  
  bane?: "BANE" | null;
  onChange: (bane: "BANE" | null) => void;
  
};

export function DieBane({ bane, onChange }: DieBaneProps) {
  return (
    <ToggleButtonGroup
      color="primary"
      value={bane}
      exclusive
      onChange={(_, value) => {
        onChange(value);
      }}
      aria-label="Bane"
      fullWidth
      sx={{
        borderRadius: 0,
        py: 1,
        ".MuiToggleButton-root": { borderRadius: 0 },
      }}
    >
       
     
      <ToggleButton value="BANE" 
        sx={{ borderWidth: 0, borderRightWidth: 1 }}
      >
        bane
      </ToggleButton>
     
      
    </ToggleButtonGroup>
  );
}