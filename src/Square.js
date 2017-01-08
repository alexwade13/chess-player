import React, { Component, PropTypes } from 'react';

export default class Square extends Component {
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number
    
    
  };

  render() {
    const { x, y, piece, last_move_squares, special_square} = this.props;
    const black = (x + y) % 2 === 1;
    var backgroundColor = black ? '#AF8769' : '#EFD9BA';
    if(last_move_squares){
      backgroundColor = 'yellow'
    }
    var specialStyle = "none";
    if(special_square) {
      specialStyle = "special"
      console.log("special")
    }
    const color = black ? 'white' : 'black';
// style={{'borderColor':'yellow',border:'1px solid'}}
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