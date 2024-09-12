import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

type DieDedgeProps = {
  dedge?: "D EDGE" | "D BANE" | null;
  onChange: (dedge: "D EDGE" | "D BANE" | null) => void;
};

export function DieDedge({ dedge, onChange }: DieDedgeProps) {
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
        D Bane
      </ToggleButton>
      <ToggleButton value="D EDGE" sx={{ border: 0 }}>
        D Edge
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
