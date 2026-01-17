import { useState } from "react";

export default function useColumnFreeze() {
  // number of columns frozen from the left (Excel-style)
  const [freezeUntil, setFreezeUntil] = useState(0);

  const toggleFreeze = (count) => {
    setFreezeUntil((prev) => (prev === count ? 0 : count));
  };

  return {
    freezeUntil,
    toggleFreeze,
  };
}