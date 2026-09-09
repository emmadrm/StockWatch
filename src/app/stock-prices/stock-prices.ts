import { Component, inject, input, resource } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { Stock } from '../services/stock';

@Component({
  imports: [DecimalPipe],
  selector: 'app-stock-prices',
  styleUrl: './stock-prices.css',
  templateUrl: './stock-prices.html',
})
export class StockPrices {
  private stockService = inject(Stock);

  symbol = input.required<string>();

  quote = resource({
    params: () => ({ symbol: this.symbol() }),
    loader: ({ params }) => firstValueFrom(this.stockService.getQuote(params.symbol)),
  });
}
