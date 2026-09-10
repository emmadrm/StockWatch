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

      const labels = data.t.map((ts) => new Date(ts * 1000).toString().slice(4, 10));

      const ctx = canvas.nativeElement.getContext('2d')!;
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.nativeElement.clientHeight || 380);
      gradient.addColorStop(0, 'rgba(201, 105, 95, 0.28)');
      gradient.addColorStop(1, 'rgba(201, 105, 95, 0)');

      const gridColor = 'rgba(255, 255, 255, 0.06)';
      const tickColor = '#9a9a9a';

      this.chart?.destroy();
      this.chart = new Chart(canvas.nativeElement, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: this.symbol(),
              data: data.c,
              borderColor: '#c9695f',
              backgroundColor: gradient,
              fill: true,
              tension: 0.3,
              pointRadius: 0,
              pointHoverRadius: 4,
              pointHoverBackgroundColor: '#c9695f',
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { intersect: false, mode: 'index' },
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#1a1a1a',
              borderColor: '#2c2c2c',
              borderWidth: 1,
              titleColor: '#f2f0ee',
              bodyColor: '#f2f0ee',
              padding: 10,
              cornerRadius: 8,
              displayColors: false,
            },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: tickColor, maxTicksLimit: 8 },
            },
            y: {
              grid: { color: gridColor },
              ticks: { color: tickColor },
            },
          },
        },
      });
    });
  }
}
