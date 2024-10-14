import * as React from "react";
import Switch from "@mui/material/Switch";

interface ModeSwitchProps {
  mode: "base" | "pro";
  onToggle: () => void;
}

const label = { inputProps: { "aria-label": "Switch demo" } };

const ModeSwitch: React.FC<ModeSwitchProps> = ({ mode, onToggle }) => {
  return (
    <div className="flex justify-center items-center">
      <span className="mr-2">Base Mode</span> {/* Base Mode on the left */}
      <Switch
        {...label}
        checked={mode === "pro"} // Checked if in pro mode
        onChange={onToggle} // Handle the toggle action
      />
      <span className="ml-2">Pro Mode</span> {/* Pro Mode on the right */}
    </div>
  );
};

export default ModeSwitch;
