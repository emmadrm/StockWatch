import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface Quote {
  c: number; // current price
  d: number; // change
  dp: number; // percent change
  h: number; // high of the day
  l: number; // low of the day
  o: number; // open price of the day
  pc: number; // previous close price
}

export interface SymbolResult {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}

export interface Candles {
  c: number[]; // close prices
  t: number[]; // timestamps
  s: string; // status: 'ok' or 'no_data'
}

export interface CompanyNews {
  headline: string;
  source: string;
  summary: string;
  url: string;
  datetime: number;
  image: string;
}

@Service()
export class Stock {
  private http = inject(HttpClient);
  private baseUrl = 'https://finnhub.io/api/v1';
  private apiKey = environment.finnhubApiKey;

  searchSymbol(query: string) {
    return this.http.get<{ result: SymbolResult[] }>(`${this.baseUrl}/search`, {
      params: { q: query, token: this.apiKey },
    });
  }

  getQuote(symbol: string) {
    return this.http.get<Quote>(`${this.baseUrl}/quote`, {
      params: { symbol, token: this.apiKey },
    });
  }

  getCandles(symbol: string, from: number, to: number, resolution: string = 'D') {
    return this.http.get<Candles>(`${this.baseUrl}/stock/candle`, {
      params: { symbol, resolution, from, to, token: this.apiKey },
    });
  }

  getCompanyNews(symbol: string, from: string, to: string) {
    return this.http.get<CompanyNews[]>(`${this.baseUrl}/company-news`, {
      params: { symbol, from, to, token: this.apiKey },
    });
  }
}
