interface CanvasOptions {
  grid?: { width: number; fill: string; size: number };
  click: (e: MouseEvent) => void;
}

export class Canvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private readonly width: number;
  private readonly height: number;

  private options: CanvasOptions;

  constructor(options?: CanvasOptions) {
    this.options = options;

    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');

    this.ctx.fillStyle = this.options.grid.fill;
    this.ctx.strokeStyle = 'rgb(90, 90, 90)';

    this.ctx.lineWidth = 1;

    this.width = this.canvas.width;
    this.height = this.canvas.height;

    if (options.grid) {
      this.grid(
        this.width / options.grid.size,
        this.height / options.grid.size,
      );
    }

    this.canvas.addEventListener('click', options.click);
  }

  offsetLeft() {
    return this.canvas.offsetLeft;
  }

  offsetTop() {
    return this.canvas.offsetTop;
  }

  private grid(tileX: number, tileY: number) {
    const size = this.options.grid.size;

    for (let i = 0; i < tileX; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(i * size - 0.5, 0);
      this.ctx.lineTo(i * size - 0.5, this.height);
      this.ctx.stroke();
    }
    for (let j = 0; j < tileY; j++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, j * size - 0.5);
      this.ctx.lineTo(this.width, j * size - 0.5);
      this.ctx.stroke();
    }
  }

  draw(board: boolean[][]) {
    this.grid(
      this.width / this.options.grid.size,
      this.height / this.options.grid.size,
    );
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (!board[i][j]) {
          continue;
        }

        const size = this.options.grid.size;
        this.ctx.fillRect(i * size, j * size, size, size);
      }
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}
