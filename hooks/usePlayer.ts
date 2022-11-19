import PlayerContext, { PlayerContextProps } from "context/PlayerContext";
import { useContext } from "react";

export default function usePlayer(): PlayerContextProps {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }

  return context;
}
