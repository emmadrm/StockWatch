import { Component, inject, input, resource } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Stock } from '../services/stock';

@Component({
  imports: [],
  selector: 'app-stock-news',
  styleUrl: './stock-news.css',
  templateUrl: './stock-news.html',
})
export class StockNews {
  private stockService = inject(Stock);

  symbol = input.required<string>();

  news = resource({
    params: () => ({ symbol: this.symbol() }),
    loader: ({ params }) => {
      const format = (d: Date) => d.toISOString().slice(0, 10);
      const to = new Date();
      const from = new Date();
      from.setDate(from.getDate() - 14);
      return firstValueFrom(
        this.stockService.getCompanyNews(params.symbol, format(from), format(to)),
      );
    },
  });
}
