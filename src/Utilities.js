import _ from 'underscore';
import {
  BOARD_SIZE,
  BOTTOM_RANK,
  LEFT_FILE,
  RIGHT_FILE,
  TOP_RANK,
} from './Constants';

const color = (piece) => (piece && piece.match(/[a-z]/) ? 'black' : 'white');
const spaceColor = (index) => {
  if ((index + (rank(index) % 2)) % 2) {
    return 'black';
  } else {
    return 'white';
  }
};
const file = (index) => (index % BOARD_SIZE);
const rank = (index) => (BOARD_SIZE - Math.floor(index / BOARD_SIZE));

const moveVertical = (increment) => (
  (space) => (space - (BOARD_SIZE * increment))
);
const moveHorizontal = (increment) => ((space) => (space + increment));

const invalidMove = (h, v, startIndex) => {
  const down = v < 0;
  const left = h < 0;
  const right = h > 0;
  const up = v > 0;

  const currentFile = file(startIndex);
  const currentRank = rank(startIndex);

  return (
    (right && currentFile + h > RIGHT_FILE) ||
    (left && currentFile + h < LEFT_FILE) ||
    (up && currentRank + v > TOP_RANK) ||
    (down && currentRank + v < BOTTOM_RANK)
  );
};

const lambda = (h, v, recursive, axesRever, reflX, reflY) => {
  let moveFunc, hValues, vValues;
  if (recursive) {
    moveFunc = moveRecursive;
  } else {
    moveFunc = move;
  }
  if (reflX) {
    hValues = _.uniq([ h, -1 * h ]);
  } else {
    hValues = [ h ];
  }
  if (reflY) {
    vValues = _.uniq([ v, -1 * v ]);
  } else {
    vValues = [ v ];
  }

  return (space, spaces, capture) => (
    _.flatten(
      hValues.map((h) => (
        vValues.map((v) => {
          let possibleMoves = moveFunc.call(this, h, v, space, spaces, capture);
          if (axesRever) {
            possibleMoves = possibleMoves.concat(
              moveFunc.call(this, v, h, space, spaces, capture)
            );
          }
          return possibleMoves;
        })
      ))
    )
  );
};

const moveRecursive = (h, v, startIndex, spaces, capture = false) => {
  let possibleSpaces = [];
  let nextIndex = move(h, v, startIndex, spaces, capture);

  while (nextIndex.length > 0) {
    let nextSpace = spaces[nextIndex[0]];
    if (nextSpace.piece) {
      if (capture) { possibleSpaces.push(nextIndex[0]); }
      nextIndex = [];
    } else {
      possibleSpaces.push(nextIndex[0]);
      nextIndex = move(h, v, nextIndex[0], spaces, capture);
    }
  }

  return possibleSpaces;
};

const move = (horizontal, vertical, startIndex, spaces, capture) => {
  if (invalidMove(horizontal, vertical, startIndex)) {
    return [];
  }

  const horFunc = moveHorizontal(horizontal);
  const vertFunc = moveVertical(vertical);

  const newSpaceIndex = horFunc(vertFunc(startIndex));

  return [ newSpaceIndex ];

  if (capture || !spaces[newSpaceIndex].piece) {
    return [ newSpaceIndex ];
  } else {
    return [];
  }
};

export { color, lambda, spaceColor, rank, file, invalidMove };
