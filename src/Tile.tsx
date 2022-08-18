import { CellData } from "./types";
import "./Tile.css";

function Tile({ value }: CellData) {
  if (!value) {
    return null;
  }

  return <div className="tile">{value}</div>;
}

export default Tile;
