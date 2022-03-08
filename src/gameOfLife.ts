export class GameOfLife {
  get board(): boolean[][] {
    return this._board;
  }

  set board(value: boolean[][]) {
    this._board = value;
  }
  private readonly size: number;

  private _board: boolean[][];

  constructor(size: number) {
    this.size = size;
    this._board = this.prepareBoard();

    this._board[1][0] = true;
    this._board[2][1] = true;
    this._board[0][2] = true;
    this._board[1][2] = true;
    this._board[2][2] = true;
  }

  prepareBoard(): boolean[][] {
    const b = [];

    for (let i = 0; i < this.size; i++) {
      const row = [];
      for (let j = 0; j < this.size; j++) {
        row.push(false);
      }
      b.push(row);
    }

    return b;
  }

  randomBoard = () => {
    const board = this.prepareBoard();
    for (let i = 0; i < this._board.length; i++) {
      for (let j = 0; j < this._board.length; j++) {
        board[i][j] = Math.random() < 0.2;
      }
    }
    this._board = board;
  };

  isAlive(x: number, y: number): boolean {
    if (x < 0 || x >= this._board.length || y < 0 || y >= this._board.length) {
      return false;
    }
    return !!this._board[x][y];
  }

  neighboursCount(x: number, y: number): number {
    let count = 0;
    for (const i of [-1, 0, 1]) {
      for (const j of [-1, 0, 1]) {
        if (!(i === 0 && j === 0)) {
          count += this.isAlive(x + i, y + j) ? 1 : 0;
        }
      }
    }

    return count;
  }

  nextGeneration() {
    const b = this.prepareBoard();
    for (let i = 0; i < this._board.length; i++) {
      for (let j = 0; j < this._board.length; j++) {
        if (!this.isAlive(i, j)) {
          if (this.neighboursCount(i, j) === 3) {
            b[i][j] = true;
          }
        } else {
          const count = this.neighboursCount(i, j);
          if (count == 2 || count == 3) {
            b[i][j] = true;
          }
        }
      }
    }
    this._board = b;
  }
}
