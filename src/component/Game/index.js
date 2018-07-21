import React, { Component } from "react";
import "./index.css";
import Squares from "../Squares";
import { GameTitle } from "./styled";
import { Start } from "./styled";
import { Score } from "./styled";
import { HighScore } from "./styled";
import { Restart } from "./styled";
import { GameOver } from "./styled";

class Game extends Component {
  constructor(props) {
    super(props);
    this.timeMoveDown = this.timeMoveDown.bind(this);
  }

  gameBoard = () => {
    const board = new Array(21).fill(false);
    for (const i in board) {
      board[i] = new Array(10).fill(false);
    }
    return board;
  };

  state = {
    timer: "",
    downSpeed: 5000,
    block: [5, 6, 15, 16],
    randomIndex: 3,
    indexBlock: [],
    indexIndexBlock: [],
    stay: false,
    gameBoard: this.gameBoard(),
    index: 100,
    score: 0,
    highScore: 0,
    stackBlock: [201, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200],
    stayBlock1: "",
    stayBlock2: "",
    stayBlock3: "",
    stayBlock4: ""
  };

  randomBlock = () => {
    const arrayObject = [
      [4, 5, 6, 7],
      [5, 6, 14, 15],
      [4, 5, 15, 16],
      [5, 6, 15, 16],
      [4, 5, 6, 15],
      [4, 5, 6, 16],
      [4, 5, 6, 14]
    ];
    const random = arrayObject[Math.floor(Math.random() * arrayObject.length)];
    this.setState({
      randomIndex: arrayObject.indexOf(random)
    });
    return random;
  };

  componentDidMount() {
    this.setState({
      timer: setInterval(this.timeMoveDown.bind(this), this.state.downSpeed)
    });
    this.timeMoveDown();
  }

  componentWillUnmount() {
    this.setState({
      timer: clearInterval(this.timeMoveDown.bind(this), this.state.downSpeed)
    });
  }

  nextBlock = () => {
    if (this.state.stay === true) {
      this.setState({
        timer: clearInterval(this.timeMoveDown.bind(this), 0),
        block: this.randomBlock(),
        stay: false,
        index: 100,
        stackBlock: this.state.stackBlock,
        indexBlock: [],
        indexIndexBlock: []
      });
      this.state.stackBlock.push(this.state.stayBlock1);
      this.state.stackBlock.push(this.state.stayBlock2);
      this.state.stackBlock.push(this.state.stayBlock3);
      this.state.stackBlock.push(this.state.stayBlock4);
    }
  };

  timeMoveDown = () => {
    for (const i in this.state.stackBlock) {
      if (
        !this.state.stay &&
        this.state.block[0] !== this.state.stackBlock[i] - 10 &&
        this.state.block[1] !== this.state.stackBlock[i] - 10 &&
        this.state.block[2] !== this.state.stackBlock[i] - 10 &&
        this.state.block[3] !== this.state.stackBlock[i] - 10
      ) {
        const block1 = this.state.block[0] + 10,
          block2 = this.state.block[1] + 10,
          block3 = this.state.block[2] + 10,
          block4 = this.state.block[3] + 10;
        this.setState({
          block: [block1, block2, block3, block4],
          score: this.state.score
        });
        break;
      } else if (this.state.stackBlock.some(i => i <= 10) === true) {
        this.setState({
          stay: true
        });
      } else {
        const indexIndexBlock0 = this.state.block[0] % 10;
        const indexBlock0 = () => {
          if (indexIndexBlock0 === 0) {
            return (this.state.block[0] - indexIndexBlock0) / 10;
          } else {
            return (this.state.block[0] - indexIndexBlock0) / 10 + 1;
          }
        };
        const indexIndexBlock1 = this.state.block[1] % 10;
        const indexBlock1 = () => {
          if (indexIndexBlock1 === 0) {
            return (this.state.block[1] - indexIndexBlock1) / 10;
          } else {
            return (this.state.block[1] - indexIndexBlock1) / 10 + 1;
          }
        };
        const indexIndexBlock2 = this.state.block[2] % 10;
        const indexBlock2 = () => {
          if (indexIndexBlock2 === 0) {
            return (this.state.block[2] - indexIndexBlock2) / 10;
          } else {
            return (this.state.block[2] - indexIndexBlock2) / 10 + 1;
          }
        };
        const indexIndexBlock3 = this.state.block[3] % 10;
        const indexBlock3 = () => {
          if (indexIndexBlock3 === 0) {
            return (this.state.block[3] - indexIndexBlock3) / 10;
          } else {
            return (this.state.block[3] - indexIndexBlock3) / 10 + 1;
          }
        };
        this.setState({
          indexBlock: [
            indexBlock0(),
            indexBlock1(),
            indexBlock2(),
            indexBlock3()
          ],
          indexIndexBlock: [
            indexIndexBlock0,
            indexIndexBlock1,
            indexIndexBlock2,
            indexIndexBlock3
          ],
          downSpeed: this.state.downSpeed - 10,
          stay: true,
          stackBlock: this.state.stackBlock,
          stayBlock1: this.state.block[0],
          stayBlock2: this.state.block[1],
          stayBlock3: this.state.block[2],
          stayBlock4: this.state.block[3]
        });
        this.stackBlock();
        this.nextBlock();
        this.lineDelete();
        break;
      }
    }
  };

  lineDelete = () => {
    for (const i in this.state.gameBoard) {
      if (this.state.gameBoard[i].every(e => e === true)) {
        this.state.gameBoard.splice(i, 1);
        this.state.gameBoard.unshift([
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false
        ]);
        const j = (i - 1) * 10,
          alreadyStack = this.state.stackBlock.filter(k => k <= j),
          newAlreadyStack = alreadyStack.map(value => value + 10),
          otherStack = this.state.stackBlock.filter(k => !(k <= j)),
          newStackBlock1 = otherStack.filter(k => k !== j + 1),
          newStackBlock2 = newStackBlock1.filter(k => k !== j + 2),
          newStackBlock3 = newStackBlock2.filter(k => k !== j + 3),
          newStackBlock4 = newStackBlock3.filter(k => k !== j + 4),
          newStackBlock5 = newStackBlock4.filter(k => k !== j + 5),
          newStackBlock6 = newStackBlock5.filter(k => k !== j + 6),
          newStackBlock7 = newStackBlock6.filter(k => k !== j + 7),
          newStackBlock8 = newStackBlock7.filter(k => k !== j + 8),
          newStackBlock9 = newStackBlock8.filter(k => k !== j + 9),
          newStackBlock = newStackBlock9.filter(k => k !== j + 10);
        Array.prototype.push.apply(newStackBlock, newAlreadyStack);
        this.setState({
          stackBlock: newStackBlock,
          score: this.state.score + 200
        });
      }
    }
  };

  moveLeftBlock = () => {
    const block1 = this.state.block[0] - 1,
      block2 = this.state.block[1] - 1,
      block3 = this.state.block[2] - 1,
      block4 = this.state.block[3] - 1;
    this.setState({
      block: [block1, block2, block3, block4]
    });
  };

  moveRightBlock = () => {
    const block1 = this.state.block[0] + 1,
      block2 = this.state.block[1] + 1,
      block3 = this.state.block[2] + 1,
      block4 = this.state.block[3] + 1;
    this.setState({
      block: [block1, block2, block3, block4]
    });
  };

  moveDownBlock = () => {
    const block1 = this.state.block[0] + 10,
      block2 = this.state.block[1] + 10,
      block3 = this.state.block[2] + 10,
      block4 = this.state.block[3] + 10;
    this.setState({
      block: [block1, block2, block3, block4],
      score: this.state.score + 1
    });
  };

  indexP = () => {
    const index = this.state.index;
    this.setState({
      index: index + 1
    });
  };

  indexM = () => {
    const index = this.state.index;
    this.setState({
      index: index - 1
    });
  };
  rotateBlock = () => {
    const block1 = this.state.block[0],
      block2 = this.state.block[1],
      block3 = this.state.block[2],
      block4 = this.state.block[3],
      index = this.state.index;
    if (index % 4 === 0 || index % 4 === 2) {
      if (this.state.randomIndex === 0) {
        this.setState({
          block: [block1 + 1, block2 + 10, block3 + 19, block4 + 28]
        });
      } else if (this.state.randomIndex === 1) {
        this.setState({
          block: [block1, block2 + 9, block3 + 2, block4 + 11]
        });
      } else if (this.state.randomIndex === 2) {
        this.setState({
          block: [block1 + 1, block2 + 9, block3, block4 + 8]
        });
      }
    } else if (index % 4 === 1 || index % 4 === 3) {
      if (this.state.randomIndex === 0) {
        if (block1 % 10 === 0) {
          this.setState({
            block: [block1 - 3, block2 - 12, block3 - 21, block4 - 30]
          });
        } else if (block1 % 10 === 1) {
          this.setState({
            block: [block1, block2 - 9, block3 - 18, block4 - 27]
          });
        } else {
          this.setState({
            block: [block1 - 1, block2 - 10, block3 - 19, block4 - 28]
          });
        }
      } else if (this.state.randomIndex === 1) {
        if (block1 % 10 === 1) {
          this.setState({
            block: [block1 + 1, block2 - 8, block3 - 1, block4 - 10]
          });
        } else {
          this.setState({
            block: [block1, block2 - 9, block3 - 2, block4 - 11]
          });
        }
      } else if (this.state.randomIndex === 2) {
        if (block1 % 10 === 0) {
          this.setState({
            block: [block1 - 2, block2 - 10, block3 - 1, block4 - 9]
          });
        } else {
          this.setState({
            block: [block1 - 1, block2 - 9, block3, block4 - 8]
          });
        }
      }
    }
  };
  rightRotateBlock = () => {
    const block1 = this.state.block[0],
      block2 = this.state.block[1],
      block3 = this.state.block[2],
      block4 = this.state.block[3],
      index = this.state.index;
    if (index % 4 === 0) {
      if (this.state.randomIndex === 4) {
        this.setState({
          block: [block1 - 9, block2 - 1, block3 - 1, block4]
        });
      } else if (this.state.randomIndex === 5) {
        this.setState({
          block: [block1 + 1, block2 + 10, block3 + 18, block4 + 9]
        });
      } else if (this.state.randomIndex === 6) {
        this.setState({
          block: [block1, block2, block3 + 9, block4 + 11]
        });
      }
    } else if (index % 4 === 1) {
      if (this.state.randomIndex === 4) {
        if (block1 % 10 === 0) {
          this.setState({
            block: [block1 - 1, block2 - 1, block3 - 1, block4 - 10]
          });
        } else {
          this.setState({
            block: [block1, block2, block3, block4 - 9]
          });
        }
      } else if (this.state.randomIndex === 5) {
        if (block1 % 10 === 0) {
          this.setState({
            block: [block1 - 2, block2 - 2, block3 - 10, block4 - 10]
          });
        } else {
          this.setState({
            block: [block1 - 1, block2 - 1, block3 - 9, block4 - 9]
          });
        }
      } else if (this.state.randomIndex === 6) {
        if (block2 % 10 === 0) {
          this.setState({
            block: [block1 + 1, block2 + 8, block3 - 1, block4 - 10]
          });
        } else {
          this.setState({
            block: [block1 + 2, block2 + 9, block3, block4 - 9]
          });
        }
      }
    } else if (index % 4 === 2) {
      if (this.state.randomIndex === 4) {
        this.setState({
          block: [block1, block2 + 1, block3 + 1, block4 + 9]
        });
      } else if (this.state.randomIndex === 5) {
        this.setState({
          block: [block1 + 1, block2 - 8, block3, block4 + 9]
        });
      } else if (this.state.randomIndex === 6) {
        this.setState({
          block: [block1 - 1, block2 + 1, block3 + 10, block4 + 10]
        });
      }
    } else if (index % 4 === 3) {
      if (this.state.randomIndex === 4) {
        if (block1 % 10 === 1) {
          this.setState({
            block: [block1 + 10, block2 + 1, block3 + 1, block4 + 1]
          });
        } else {
          this.setState({
            block: [block1 + 9, block2, block3, block4]
          });
        }
      } else if (this.state.randomIndex === 5) {
        if (block1 % 10 === 1) {
          this.setState({
            block: [block1, block2, block3 - 8, block4 - 8]
          });
        } else {
          this.setState({
            block: [block1 - 1, block2 - 1, block3 - 9, block4 - 9]
          });
        }
      } else if (this.state.randomIndex === 6) {
        if (block4 % 10 === 0) {
          this.setState({
            block: [block1 - 1, block2 - 10, block3 - 19, block4 - 12]
          });
        } else {
          this.setState({
            block: [block1, block2 - 9, block3 - 18, block4 - 11]
          });
        }
      }
    }
  };

  leftRotateBlock = () => {
    const block1 = this.state.block[0],
      block2 = this.state.block[1],
      block3 = this.state.block[2],
      block4 = this.state.block[3],
      index = this.state.index;
    if (index % 4 === 0) {
      if (this.state.randomIndex === 4) {
        this.setState({
          block: [block1 - 9, block2, block3, block4]
        });
      } else if (this.state.randomIndex === 5) {
        this.setState({
          block: [block1 + 1, block2 + 1, block3 + 9, block4 + 9]
        });
      } else if (this.state.randomIndex === 6) {
        this.setState({
          block: [block1, block2 + 9, block3 + 18, block4 + 11]
        });
      }
    } else if (index % 4 === 3) {
      if (this.state.randomIndex === 4) {
        if (block1 % 10 === 1) {
          this.setState({
            block: [block1 + 1, block2, block3, block4 - 8]
          });
        } else {
          this.setState({
            block: [block1, block2 - 1, block3 - 1, block4 - 9]
          });
        }
      } else if (this.state.randomIndex === 5) {
        if (block1 % 10 === 1) {
          this.setState({
            block: [block1, block2 + 9, block3 + 1, block4 - 8]
          });
        } else {
          this.setState({
            block: [block1 - 1, block2 + 8, block3, block4 - 9]
          });
        }
      } else if (this.state.randomIndex === 6) {
        if (block1 % 10 === 1) {
          this.setState({
            block: [block1 + 2, block2, block3 - 9, block4 - 9]
          });
        } else {
          this.setState({
            block: [block1 + 1, block2 - 1, block3 - 10, block4 - 10]
          });
        }
      }
    } else if (index % 4 === 2) {
      if (this.state.randomIndex === 4) {
        this.setState({
          block: [block1, block2, block3, block4 + 9]
        });
      } else if (this.state.randomIndex === 5) {
        this.setState({
          block: [block1 + 1, block2 + 1, block3 + 9, block4 + 9]
        });
      } else if (this.state.randomIndex === 6) {
        this.setState({
          block: [block1 - 1, block2 - 8, block3 + 1, block4 + 10]
        });
      }
    } else if (index % 4 === 1) {
      if (this.state.randomIndex === 4) {
        if (block1 % 10 === 0) {
          this.setState({
            block: [block1 + 8, block2, block3, block4 - 1]
          });
        } else {
          this.setState({
            block: [block1 + 9, block2 + 1, block3 + 1, block4]
          });
        }
      } else if (this.state.randomIndex === 5) {
        if (block1 % 10 === 0) {
          this.setState({
            block: [block1 - 1, block2 - 10, block3 - 18, block4 - 9]
          });
        } else {
          this.setState({
            block: [block1 - 2, block2 - 11, block3 - 19, block4 - 10]
          });
        }
      } else if (this.state.randomIndex === 6) {
        if (block2 % 10 === 0) {
          this.setState({
            block: [block1 - 1, block2 - 1, block3 - 10, block4 - 12]
          });
        } else {
          this.setState({
            block: [block1, block2, block3 - 9, block4 - 11]
          });
        }
      }
    }
  };

  stackBlock = () => {
    if (this.state.stay === true) {
      for (const i in this.state.indexBlock) {
        const gameBoard = this.state.gameBoard;
        gameBoard[this.state.indexBlock[i]].splice(
          this.state.indexIndexBlock[i] - 1,
          1,
          true
        );
      }
    }
  };

  applyBGcolor = stay => {
    if (stay === false) {
      return "#90caf9";
    } else if (stay === true) {
      return "#002171";
    }
  };

  handleKeydown = e => {
    e.preventDefault();
    for (const i in this.state.stackBlock) {
      if (
        !this.state.stay &&
        this.state.block[0] !== this.state.stackBlock[i] - 10 &&
        this.state.block[1] !== this.state.stackBlock[i] - 10 &&
        this.state.block[2] !== this.state.stackBlock[i] - 10 &&
        this.state.block[3] !== this.state.stackBlock[i] - 10
      ) {
        this.setState({
          score: this.state.score
        });
        if (
          e.keyCode === 39 &&
          !(this.state.block[0] % 10 === 0) &&
          !(this.state.block[1] % 10 === 0) &&
          !(this.state.block[2] % 10 === 0) &&
          !(this.state.block[3] % 10 === 0)
        ) {
          this.moveRightBlock();
        } else if (
          e.keyCode === 37 &&
          !(this.state.block[0] % 10 === 1) &&
          !(this.state.block[1] % 10 === 1) &&
          !(this.state.block[2] % 10 === 1) &&
          !(this.state.block[3] % 10 === 1)
        ) {
          this.moveLeftBlock();
        } else if (e.keyCode === 40) {
          this.moveDownBlock();
        }
        if (e.keyCode === 90) {
          this.indexP();
          this.rotateBlock();
          this.rightRotateBlock();
        } else if (e.keyCode === 88) {
          this.indexM();
          this.rotateBlock();
          this.leftRotateBlock();
        }
      } else if (this.state.stackBlock.some(i => i <= 10) === true) {
        this.setState({
          stay: true,
          block: [0, 0, 0, 0]
        });
      } else {
        const indexIndexBlock0 = this.state.block[0] % 10;
        const indexBlock0 = () => {
          if (indexIndexBlock0 === 0) {
            return (this.state.block[0] - indexIndexBlock0) / 10;
          } else {
            return (this.state.block[0] - indexIndexBlock0) / 10 + 1;
          }
        };
        const indexIndexBlock1 = this.state.block[1] % 10;
        const indexBlock1 = () => {
          if (indexIndexBlock1 === 0) {
            return (this.state.block[1] - indexIndexBlock1) / 10;
          } else {
            return (this.state.block[1] - indexIndexBlock1) / 10 + 1;
          }
        };
        const indexIndexBlock2 = this.state.block[2] % 10;
        const indexBlock2 = () => {
          if (indexIndexBlock2 === 0) {
            return (this.state.block[2] - indexIndexBlock2) / 10;
          } else {
            return (this.state.block[2] - indexIndexBlock2) / 10 + 1;
          }
        };
        const indexIndexBlock3 = this.state.block[3] % 10;
        const indexBlock3 = () => {
          if (indexIndexBlock3 === 0) {
            return (this.state.block[3] - indexIndexBlock3) / 10;
          } else {
            return (this.state.block[3] - indexIndexBlock3) / 10 + 1;
          }
        };
        this.setState({
          indexBlock: [
            indexBlock0(),
            indexBlock1(),
            indexBlock2(),
            indexBlock3()
          ],
          indexIndexBlock: [
            indexIndexBlock0,
            indexIndexBlock1,
            indexIndexBlock2,
            indexIndexBlock3
          ],
          downSpeed: this.state.downSpeed - 10,
          score: this.state.score,
          stay: true,
          stackBlock: this.state.stackBlock,
          stayBlock1: this.state.block[0],
          stayBlock2: this.state.block[1],
          stayBlock3: this.state.block[2],
          stayBlock4: this.state.block[3]
        });
        this.stackBlock();
        this.nextBlock();
        this.lineDelete();
        this.setState({
          score: this.state.score + 10
        });
        break;
      }
    }
  };

  handleClick = () => {
    this.setState({
      rotate: 0,
      clockwis: 90,
      counterClockwis: -90,
      timer: "",
      downSpeed: 5000,
      block: this.randomBlock(),
      indexBlock: [],
      indexIndexBlock: [],
      stay: false,
      gameBoard: this.gameBoard(),
      score: 0,
      stackBlock: [191, 192, 193, 194, 195, 196, 197, 198, 199, 200],
      stayBlock1: "",
      stayBlock2: "",
      stayBlock3: "",
      stayBlock4: ""
    });
  };

  gameOver = () => {
    if (this.state.stackBlock.some(i => i <= 10) === true) {
      if (this.state.score > this.state.highScore) {
        const highScore = this.state.score;
        this.setState({
          highScore: highScore
        });
      }
      return (
        <div>
          <GameOver>
            GAME OVER <br />HIGH SCORE:{this.state.highScore}
          </GameOver>
          <Restart onClick={this.handleClick}>RESTART</Restart>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <GameTitle>Tetris</GameTitle>
        {this.gameOver()}
        <Start onClick={this.applyBGcolor} onKeyDown={this.handleKeydown}>
          START!
        </Start>
        <Squares
          rotate={this.state.rotate}
          board={this.state.board}
          block={this.state.block}
          stay={this.state.stay}
          gameBoard={this.state.gameBoard}
          applyBGcolor={this.applyBGcolor}
          stackBlock={this.state.stackBlock}
          indexIndexBlock={this.state.indexIndexBlock}
          indexBlock={this.state.indexBlock}
        />
        <Score>SCORE:{this.state.score}</Score>
        <HighScore>HIGH SCORE:{this.state.highScore}</HighScore>
      </div>
    );
  }
}
export default Game;
