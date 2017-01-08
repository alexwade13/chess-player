import React, { Component, PropTypes } from 'react';
import Square from './Square';
import sample from '../sample_board.json';
import b_rook from './img/b_rook.png';
import w_rook from './img/w_rook.png';
import b_knight from './img/b_knight.png';
import w_knight from './img/w_knight.png';
import b_bishop from './img/b_bishop.png';
import w_bishop from './img/w_bishop.png';
import b_queen from './img/b_queen.png';
import w_queen from './img/w_queen.png';
import b_king from './img/b_king.png';
import w_king from './img/w_king.png';
import b_pawn from './img/b_pawn.png';
import w_pawn from './img/w_pawn.png';

export default class Board extends Component {
  static propTypes = {
  
  };

  constructor(props) {
    super(props);
    const board = sample.game_board.board
    const pieces = sample.game_board.board.pieces.split('/').map((row)=>row.split(""))

    //move represents which move state we are in. -1 is the current board.
    //0 is the previous move, 1 the move before that, etc, till the board is at starting state
    this.state = {

      board,
      pieces,
      move:-1,
      last_move_squares:board.last_move_squares,
      special_square:board.special_square

    };
  }


  renderSquare(i,x,y,direction = null) {


    var style = { width: '12.5%', height: '12.5%' }
    var piece = this.findPiece(this.state.pieces[x][y])

    var {last_move_squares,special_square} = this.state;
    var {to, from} = last_move_squares ? last_move_squares : {}

    if(to && to.row === x && to.col === y){
      last_move_squares = true;
    } else if( from && from.row === x && from.col === y){
      last_move_squares = true;
    } else {
      last_move_squares = false;
    }

    if(special_square && special_square.row === x && special_square.col === y){
      special_square = true;
    } else {
      special_square = false;
    }

    return (
      <div key={i}
           style={style}>
        <Square x={x}
                y={y}
                piece={piece}
                last_move_squares={last_move_squares}
                special_square={special_square}
                >
          
        </Square>
      </div>
    );
  }

  findPiece(piece){
    switch(piece){
      case 'p':
        return w_pawn
      case 'P':
        return b_pawn
      case 'r':
        return w_rook
      case 'R':
        return b_rook
      case 'n':
        return w_knight
      case 'N':
        return b_knight
      case 'b':
        return w_bishop
      case 'B':
        return b_bishop
      case 'q':
        return w_queen
      case'Q':
        return b_queen
      case'k':
        return w_king
      case'K':
        return b_king

        
    }
  }

  prevStep(){
    var length = sample.past_moves_board.length
    var move = this.state.move + 1
    if(move === length){
      move = -1
    }
    this.setBoard(move)     
  }

  nextStep(){
    var move = (this.state.move - 1)
    if(move < -1){
      move += 1
    }
    this.setBoard(move)     
  }

  setBoard(move){
    var pieces
    var board
    if(move === -1){
      board = sample.game_board.board
    } else {
      board = sample.past_moves_board[move]
    }
    pieces = board.pieces.split('/').map((row)=>row.split("")) 
    this.setState({board:board,pieces:pieces, move:move,last_move_squares:board.last_move_squares, special_square:board.special_square})
  }

  play(){
    var recurse = function(){
      if(this.state.move !== -1) {
        this.nextStep()
        setTimeout(()=>{
          recurse.apply(this)
        }, 500)  
      }

    }
    this.setState({move:sample.past_moves_board.length},recurse.bind(this))
  
  }

  render() {

    const squares = [];
    var x;
    var y;
    var {from,to} = this.state.last_move_squares !== undefined ? this.state.last_move_squares : {}
    
    var payload = []
    var special = this.state.special;
    for (let i = 0; i < 64; i++) {
      payload = []
      x = Math.floor(i / 8);
      y = i % 8;

      payload.push(i);
      payload.push(x);
      payload.push(y);

      if(from && from.row === x && from.col === y){
        payload.push("from")
      } else if(to && to.row === x && to.col === y){
        payload.push("to")
      }

      if(special && special.row === x && special.col === y ) {
        payload.push("special")
      }

      squares.push(this.renderSquare(...payload));  

    }

    return (
      
      <div className='Board'>
        {squares}
        <div className='button'>
          <button onClick={this.prevStep.bind(this)}>back</button>
          <button onClick={this.nextStep.bind(this)}>forward</button>
          <button onClick={this.play.bind(this)}>play</button>
        </div>

      </div>
    );
  }
}