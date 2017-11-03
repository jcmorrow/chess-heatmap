import React from 'react';
import ReactDOM from 'react-dom';
import ChessBoard from './ChessBoard';
import Fen from './Fen';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ChessBoard />, div);
});
