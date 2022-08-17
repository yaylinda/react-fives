import "./Board.css";

const NUM_ROWS = 5;
const NUM_COLS = 5;

function BoardSpot() {
  return <div className="boardSpot"></div>;
}

function Board() {
  return (
    <div className="board">
      {Array.from(Array(NUM_ROWS)).map((r) => (
        <div className="row">
          {Array.from(Array(NUM_COLS)).map((c) => (
            <BoardSpot />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
