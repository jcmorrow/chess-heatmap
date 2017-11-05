import Move from './Move';

it('generates the correct lambda for a pawn move', () => {
  const spaces = Array(64).fill({}).map((_obj, i) => ({ index: i }));

  expect(Move.whitePawn(60, spaces)).toEqual([ 53, 51 ]);
  expect(Move.blackPawn(34, spaces)).toEqual([ 43, 41 ]);
});

it('generates the correct lambda for a king move', () => {
  const spaces = Array(64).fill({}).map((_obj, i) => ({ index: i }));

  expect(Move.king(35, spaces)).toEqual([ 28, 44, 26, 42, 36, 27, 34, 43 ]);
});

it('generates the correct lambda for a bishop move', () => {
  const spaces = Array(64).fill({}).map((_obj, i) => ({ index: i }));

  expect(Move.bishop(45, spaces)).toEqual(
    expect.arrayContaining([ 38, 31, 54, 63, 36, 27, 18, 9, 0, 52, 59 ])
  );
});

it('generates the correct lambda for a rook move', () => {
  const spaces = Array(64).fill({}).map((_obj, i) => ({ index: i }));

  expect(Move.rook(50, spaces))
    .toEqual((
      [ 51, 52, 53, 54, 55, 42, 34, 26, 18, 10, 2, 49, 48, 58 ]
    ));
});

it('generates the correct lambda for a queen move', () => {
  const spaces = Array(64).fill({}).map((_obj, i) => ({ index: i }));

  expect(Move.queen(50, spaces).sort())
    .toEqual(expect.arrayContaining(
      [ 10, 15, 18, 2, 22, 26, 29, 32, 34, 36, 41, 42,
        43, 48, 49, 51, 52, 53, 54, 55, 57, 58, 59 ].sort()
    ));
});

it('generates the correct lambda for a knight move', () => {
  const spaces = Array(64).fill({}).map((_obj, i) => ({ index: i }));

  expect(Move.knight(45, spaces))
    .toEqual(expect.arrayContaining([ 30, 39, 62, 35, 28, 55, 60, 51 ]));
});
