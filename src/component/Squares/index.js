import React from "react";
import { Board } from "../Game/styled";
import { GameBoard } from "../Game/styled";

const Squares = props => {
  const renderSquare = index => (
    <Board
      key={index}
      block={props.block}
      stay={props.stay}
      gameBoard={props.gameBoard}
      applyBGcolor={props.applyBGcolor}
      className="btn"
      stackBlock={props.stackBlock}
      indexIndexBlock={props.indexIndexBlock}
      indexBlock={props.indexBlock}
      outBoard={outBoard}
      stayColor={stayColor}
    />
  );
  const gameStage = () => {
    const gameBoard = props.gameBoard;
    return gameBoard.map((value, index) =>
      gameBoard[index].map((e, i) => renderSquare(i))
    );
  };

  const stayColor = () => {
    return props.gameBoard.map((value, index) => {
      return props.gameBoard[index].map((e, i) => {
        if (props.gameBoard[index][i] === true) {
          return `&:nth-of-type(${index * 10 + i + 1}),`;
        } else {
          return ``;
        }
      });
    });
  };

  const outBoard = () => {
    const black = "#000",
      arrayOut = [201, 202, 203, 204, 205, 206, 207, 208, 209, 210];
    return arrayOut.map((e, i) => {
      return `&:nth-of-type(${arrayOut[i]}){background-color: ${black}}`;
    });
  };

  return <GameBoard>{gameStage()}</GameBoard>;
};

export default Squares;
