import "./Board.css";
import useGameStore from "./gameStore";

function Board() {
  const { board } = useGameStore();

  console.log(`[Board] board=${JSON.stringify(board)}`);

  return (
    <div className="board">
      {board.map((row, r) => (
        <div key={`row_${r}`} className="row">
          {row.map((_, c) => (
            <div key={`row_${r}_col_${c}`} className="cell"></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
