import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

type DieDEdgeProps = {
  dedge?: "D EDGE" | "D BANE" | null;
  dbane?: "D EDGE" | "D BANE" | null;
  onChange: (dedge: "D EDGE" | "D BANE" | null) => void;
};

export function DieDEdge({ dedge, dbane, onChange }: DieDEdgeProps) {
  return (
    <ToggleButtonGroup
      color="primary"
      value={dedge}
      exclusive
      onChange={(_, value) => {
        onChange(value);
      }}
      aria-label="D Edge / D Bane"
      fullWidth
      sx={{
        borderRadius: 0,
        py: 1,
        ".MuiToggleButton-root": { borderRadius: 0 },
      }}
    >
      <ToggleButton
        value="D BANE"
        sx={{ borderWidth: 0, borderRightWidth: 1 }}
      >
        Double Bane
      </ToggleButton>
      <ToggleButton value="D EDGE" sx={{ border: 0 }}>
        Double Edge
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
