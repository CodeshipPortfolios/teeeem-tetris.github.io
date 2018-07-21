import styled from "styled-components";

/*------------------------------Game------------------------------*/
export const GameTitle = styled.h1`
  text-align: center;
  font-size: 70px;
`;

export const Start = styled.button`
  padding: 20px;
  margin-left: 80%;
  text-align: center;
  background-color: #546e7a;
  border: 1px solid #000;
  color: #fff;
  border-radius: 20px;
  font-size: 20px;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    background-color: #37474f;
  }
`;

export const Score = styled.h2`
  width: 218px;
  background-color: #1976d2;
  color: #fff;
  margin: 0 auto;
  border: 1px solid #000;
`;

export const HighScore = styled.h3`
  width: 218px;
  background-color: #1564bf;
  color: #fff;
  margin: 0 auto;
  border: 1px solid #000;
`;

export const Restart = styled.button`
  padding: 20px;
  background-color: #546e7a;
  border: 1px solid #000;
  color: #fff;
  border-radius: 20px;
  font-size: 20px;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    background-color: #37474f;
  }
`;

export const GameOver = styled.h1`
  z-index: 99999;
  font-size: 70px;
  text-align: center;
`;

/*------------------------------Squares------------------------------*/
export const Board = styled.button`
  padding: 10px;
  border: 1px solid #888888;
  box-sizing: border-box;
  ${props => props.stayColor()} &:nth-of-type(210) {
    background-color: #002171;
  }
  ${props => props.outBoard()};
  &:nth-of-type(${props => props.block[0]}),
  &:nth-of-type(${props => props.block[1]}),
  &:nth-of-type(${props => props.block[2]}),
  &:nth-of-type(${props => props.block[3]}) {
    background-color: ${props => props.applyBGcolor(props.stay)};
  }
`;

export const GameBoard = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 220px;
  overflow: hidden;
  margin: 0 auto;
`;
