There's a key insight about how things move in chess: all moves can be described
as three properties: how many spaces a piece moves on the horizontal axis (on
its rank), and how many spaces a piece moves on the vertical axis (on its file),
and whether or not it can move recursively (bishops, queens, and rooks move
recursively, all other pieces do not). Under this scheme all moves can be
described as a three-length tuple of:

(horizontal, vertical, recursive)

From this information we can produce a lambda which will return us all of the
possible moves if we are given the starting space and the spaces of the current
board. (It's also worth noting that pieces can have multiple move lambdas).

For example, bishops have the following move lambdas available to them:

```
[ 1,  1, true] # up and right
[ 1, -1, true] # down and right
[-1, -1, true] # down and left
[-1,  1, true] # up and left
```

I expect knights to be more difficult, but in fact they were not. Knights have
the following move lambdas:

```
[ 1,  2, false]
[ 2,  1, false]
[-1,  2, false]
[ 2, -1, false]
[ 1, -2, false]
[-2,  1, false]
[-1, -2, false]
[-2, -1, false]
```

I suspect you could take this one step farther and say which axes the piece's
move lambda can be reflected over. To condense rook from four move lambda
descriptions to two:

```
rook: [
  {
    x: 1,
    y: 0,
    xReflect: true,
    yReflect: true,
    recursive: true
  },
  {
    x: 0,
    y: 1,
    xReflect: true,
    yReflect: true,
    recursive: true
  }
```

In fact, rook can be described in one if we add a new trait `axesReversible`:

```
rook: {
  x: 1,
  y: 0,
  axesReversible: true,
  xReflect: true,
  yReflect: true,
  recursive: true
}
```

```
bishop:  {
  x: 1,
  y: 1,
  axesReversible: false,
  xReflect: true,
  yReflect: true,
  recursive: true
}
knight: {
  x: 1,
  y: 2,
  axesReversible: true,
  xReflect: true,
  yReflect: true,
  recursive: true
},
pawn: {
  x: 0,
  y: 1,
  axesReversible: false,
  xReflect: false,
  yReflect: false,
  recursive: false
},
queen: [
  {
    x: 1,
    y: 0,
    axesReversible: true,
    xReflect: true,
    yReflect: true,
    recursive: true
  },
  {
    x: 1,
    y: 1,
    axesReversible: true,
    xReflect: true,
    yReflect: true,
    recursive: true
  },
]
rook: {
  x: 1,
  y: 0,
  axesReversible: true,
  xReflect: true,
  yReflect: true,
  recursive: true
}

`
| piece  | horizontal | vertical | recursive | axesReversible | reflectX | reflectY |
|--------|------------|----------|-----------|----------------|----------|----------|
| pawn   | 0          | 1        | false     | false          | false    | false    |
| bishop | 1          | 1        | true      | true           | true     | true     |
| knight | 2          | 1        | false     | true           | true     | true     |
| rook   | 1          | 0        | true      | true           | true     | true     |
| king   | 1          | 0        | false     | true           | true     | true     |
| king   | 1          | 1        | false     | true           | true     | true     |
| queen  | 1          | 0        | true      | true           | true     | true     |
| queen  | 1          | 1        | true      | true           | true     | true     |
`
