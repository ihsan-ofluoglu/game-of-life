import { Canvas } from './canvas';
import { GameOfLife } from './gameOfLife';

const options = {
  grid: {
    width: 1,
    size: 20,
    fill: 'rgb(100, 240, 150)',
  },
};

function main() {
  const gameOfLife = new GameOfLife(40);

  gameOfLife.randomBoard();
  const canvas = new Canvas({
    ...options,
    click: (e: MouseEvent) => {
      const x = Math.floor((e.clientX - canvas.offsetLeft()) / 20);
      const y = Math.floor((e.clientY - canvas.offsetTop()) / 20);
      gameOfLife.board[x][y] = !gameOfLife.board[x][y];
      canvas.draw(gameOfLife.board);
    },
  });

  setInterval(() => {
    canvas.clear();
    canvas.draw(gameOfLife.board);
    gameOfLife.nextGeneration();
  }, 300);
}

main();
