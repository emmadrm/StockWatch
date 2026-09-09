import { Component, ElementRef, afterRenderEffect, input, resource, viewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import type { Candles } from '../services/stock';

Chart.register(...registerables);

// TODO: mock δεδομένα προσωρινά — το free tier του Finnhub δεν επιτρέπει
// ιστορικές τιμές μετοχών. Αντικατέστησε με πραγματικό API όταν διαλέξουμε πηγή.
function generateMockCandles(symbol: string): Candles {
  const days = 90;
  const now = Math.floor(Date.now() / 1000);
  const dayInSeconds = 60 * 60 * 24;

  let seed = symbol.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 1);
  const nextRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  let price = 50 + (seed % 200);
  const c: number[] = [];
  const t: number[] = [];
  for (let i = days; i >= 0; i--) {
    price = Math.max(1, price + (nextRandom() - 0.5) * price * 0.03);
    c.push(Number(price.toFixed(2)));
    t.push(now - i * dayInSeconds);
  }

  return { c, t, s: 'ok' };
}

@Component({
  imports: [],
  selector: 'app-stock-chart',
  styleUrl: './stock-chart.css',
  templateUrl: './stock-chart.html',
})
export class StockChart {
  symbol = input.required<string>();
  canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('canvas');
  private chart?: Chart;

  candles = resource({
    params: () => ({ symbol: this.symbol() }),
    loader: async ({ params }) => generateMockCandles(params.symbol),
  });

  constructor() {
    afterRenderEffect(() => {
      const data = this.candles.value();
      const canvas = this.canvasRef();
      if (!data || data.s !== 'ok' || !canvas) return;

      const labels = data.t.map((ts) => new Date(ts * 1000).toLocaleDateString('el-GR'));

      this.chart?.destroy();
      this.chart = new Chart(canvas.nativeElement, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: this.symbol(),
              data: data.c,
              borderColor: '#2563eb',
              tension: 0.2,
              pointRadius: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    });
  }
}
