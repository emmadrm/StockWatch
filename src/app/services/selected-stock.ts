import { Service, signal } from '@angular/core';

@Service()
export class SelectedStockStore {
  readonly symbol = signal('AAPL');

  select(symbol: string) {
    const s = symbol.trim().toUpperCase();
    if (s) this.symbol.set(s);
  }
}
