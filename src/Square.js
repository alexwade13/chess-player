import React, { Component, PropTypes } from 'react';

export default class Square extends Component {
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number
    
  };

  render() {

    const { x, y } = this.props;
    const black = (x + y) % 2 === 1;
    const backgroundColor = black ? 'blue' : 'red';
    const color = black ? 'white' : 'black';

    return (
      <div style={{
        color,
        backgroundColor,
        width: '100%',
        height: '100%'
      }}>
        {this.props.children}
      </div>
    );
  }
}