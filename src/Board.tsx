import "./Board.css";

const NUM_ROWS = 5;
const NUM_COLS = 5;

function Board() {
  return (
    <div className="board">
      {Array.from(Array(NUM_ROWS)).map((_, r) => (
        <div key={`row_${r}`} className="row">
          {Array.from(Array(NUM_COLS)).map((_, c) => (
            <div key={`row_${r}_col_${c}`} className="cell"></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
