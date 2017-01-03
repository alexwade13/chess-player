import React, { Component, PropTypes } from 'react';
import Square from './Square';
import sample from '../sample_board.json';
import pawn from './img/b_queen.png';

export default class Board extends Component {
  static propTypes = {
  
  };

  renderSquare(i) {
    const x = i % 8;
    const y = Math.floor(i / 8);

    return (
      <div key={i}
           style={{ width: '12.5%', height: '12.5%' }}>
        <Square x={x}
                y={y}>
          <img src={pawn}   />
        </Square>
      </div>
    );
  }


  render() {
    
    const pieces = sample.game_board.board.pieces.split('/').map((row)=>row.split(""))
    console.log(pieces)
    const squares = [];
    for (let i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i));
    }

    return (
      <div className='Board'>
        {squares}
      </div>
    );
  }
}