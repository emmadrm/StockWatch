import { Component, inject, output } from '@angular/core';
import { WatchlistStore } from '../services/watchlist-store';

@Component({
  imports: [],
  selector: 'app-watchlist',
  styleUrl: './watchlist.css',
  templateUrl: './watchlist.html',
})
export class Watchlist {
  private watchlistStore = inject(WatchlistStore);

  symbols = this.watchlistStore.list;
  selectSymbol = output<string>();

  remove(symbol: string) {
    this.watchlistStore.remove(symbol);
  }
}
