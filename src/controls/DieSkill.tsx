import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

type DieSkillProps = {
  
  skill?: "SKILL" |  null;
  onChange: (skill: "SKILL" |  null) => void;
  
};

export function DieSkill({ skill, onChange }: DieSkillProps) {
  return (
    <ToggleButtonGroup
      color="primary"
      value={skill}
      exclusive
      onChange={(_, value) => {
        onChange(value);
      }}
      aria-label="Skill"
      fullWidth
      sx={{
        borderRadius: 0,
        py: 1,
        ".MuiToggleButton-root": { borderRadius: 0 },
      }}
    >
       <ToggleButton
        value="SKILL"
        sx={{ border: 0 }}
      >
        Skilled
      </ToggleButton>
    </ToggleButtonGroup>
  );
}