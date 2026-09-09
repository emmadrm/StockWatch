import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StockPrices } from '../stock-prices/stock-prices';
import { StockChart } from '../stock-chart/stock-chart';
import { StockNews } from '../stock-news/stock-news';
import { Watchlist } from '../watchlist/watchlist';
import { WatchlistStore } from '../services/watchlist-store';
import { SelectedStockStore } from '../services/selected-stock';

@Component({
  imports: [FormsModule, StockPrices, StockChart, StockNews, Watchlist],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private watchlistStore = inject(WatchlistStore);
  protected selectedStock = inject(SelectedStockStore);

  addToWatchlist() {
    this.watchlistStore.add(this.selectedStock.symbol());
  }
}
