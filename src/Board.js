import React, { Component } from 'react';
import Square from './Square';
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

  constructor(props) {
    super(props);

    //move represents which move state we are in. -1 is the current board.
    // 0 is the previous move, 1 the move before that, etc, till the board is at starting state
    this.state = {
    };
  }

 componentWillMount(){
    fetch('./Board')  
      .then(
        (response)=> { 
          response.json().then((data)=> {  
            const board = data.game_board.board
            const pieces = data.game_board.board.pieces.split('/').map((row)=>row.split(""))
            this.setState ({
              master:data,
              board,
              pieces,
              move:-1,
              last_move_squares:board.last_move_squares,
              special_square:board.special_square
            });
          });  
    })
  }
  renderSquare(i,x,y,direction = null) {

    let style = { width: '12.5%', height: '12.5%' }
    let piece = this.findPiece(this.state.pieces[x][y])

    let {last_move_squares,special_square} = this.state;
    let {to, from} = last_move_squares ? last_move_squares : {}
    let move_square;
    if(to && to.row === x && to.col === y){
      move_square = true;
    } else if( from && from.row === x && from.col === y){
      move_square = true;
    } else {
      move_square = false;
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
                move_square={move_square}
                special_square={special_square}
                >
        </Square>
      </div>
    );
  }
  //finds the image associated with the letter piece
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
    let length = this.state.master.past_moves_board.length
    let move = this.state.move + 1
    if(move === length){
      move = -1
    }
    this.setBoard(move)     
  }

  nextStep(){
    let move = (this.state.move - 1)
    if(move < -1){
      move += 1
    }
    this.setBoard(move)     
  }

  setBoard(move){
    let master = this.state.master
    let pieces
    let board
    if(move === -1){
      board = master.game_board.board
    } else {
      board = master.past_moves_board[move]
    }
    pieces = board.pieces.split('/').map((row)=>row.split("")) 
    this.setState({board:board,pieces:pieces, move:move,last_move_squares:board.last_move_squares, special_square:board.special_square})
  }

  play(){
    let recurse = ()=>{
      if(this.state.move !== -1) {
        this.nextStep()
        setTimeout(()=>{
          recurse.apply(this)
        }, 500)  
      }
    }
    this.setState({move:this.state.master.past_moves_board.length},recurse)
  
  }

  render() {

    const squares = [];
    let x, y;
    let {from,to} = this.state.last_move_squares !== undefined ? this.state.last_move_squares : {}


    let special = this.state.special;
    //this is only for the intital render, as it will re render after fetch call in componentWillMount
    if(this.state.board !== undefined) {
      for (let i = 0; i < 64; i++) {
        x = Math.floor(i / 8);
        y = i % 8;

        squares.push(this.renderSquare(i,x,y));  
      }
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