import React, { Component } from 'react';

export default class Square extends Component {
  render() {
    const { x, y, piece, move_square, special_square} = this.props;
    const black = (x + y) % 2 === 1;

    let backgroundColor = black ? '#EFD9BA' :'#AF8769' ;
    if(move_square){
      backgroundColor = 'yellow'
    }
    let specialStyle = "none";
    if(special_square) {
      specialStyle = "special"
    }
    
    return (
      <div style={{
        backgroundColor,
        width: '100%',
        height: '100%'
      }}>
        <div className={specialStyle}>
          <img className="pieces" src={piece}   />
        </div>

      </div>
    );
  }
}