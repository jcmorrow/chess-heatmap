class Heatmap {
  static threatenMap(spaces) {
    spaces.forEach((space) => { space.possibleMoves = 0; });
    spaces.forEach((space) => {
      space.threatens.forEach((threaten) => {
        spaces[threaten].possibleMoves += 1;
      });
    });
    return spaces;
  }
}

export default Heatmap;
