import "./Board.css";
import useGameStore from "./gameStore";
import Tile from "./Tile";

function Board() {
  const { board } = useGameStore();

  console.log(`[Board] board=${JSON.stringify(board)}`);

  return (
    <div className="board">
      {board.map((row, r) => (
        <div key={`row_${r}`} className="row">
          {row.map((cell, c) => (
            <div key={`row_${r}_col_${c}`} className="cell">
              <Tile value={cell.value} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
