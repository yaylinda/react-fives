import { CellData } from "./types";
import "./Tile.css";
import classNames from "classnames";

function Tile({ value }: CellData) {
  if (!value) {
    return null;
  }

  return <div className={classNames("tile", `tile_${value}`)}>{value}</div>;
}

export default Tile;
