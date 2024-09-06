import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

type DieEdgeProps = {
  
  edge?: "EDGE" | null;
  onChange: (edge: "EDGE" | null) => void;
  
};

export function DieEdge({ edge, onChange }: DieEdgeProps) {
  return (
    <ToggleButtonGroup
      color="primary"
      value={edge}
      exclusive
      onChange={(_, value) => {
        onChange(value);
      }}
      aria-label="Edge"
      fullWidth
      sx={{
        borderRadius: 0,
        py: 1,
        ".MuiToggleButton-root": { borderRadius: 0 },
      }}
    >
       
     
      <ToggleButton value="EDGE" 
        sx={{ borderWidth: 0, borderRightWidth: 1 }}
      >
        Edge
      </ToggleButton>
     
      
    </ToggleButtonGroup>
  );
}