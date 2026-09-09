import { Service, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const STORAGE_KEY = 'stockwatch-watchlist';

@Service()
export class WatchlistStore {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly symbols = signal<string[]>(this.loadFromStorage());

  readonly list = this.symbols.asReadonly();

  constructor() {
    effect(() => {
      const current = this.symbols();
      if (this.isBrowser) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
      }
    });
  }

  add(symbol: string) {
    const s = symbol.trim().toUpperCase();
    if (!s || this.symbols().includes(s)) return;
    this.symbols.update((list) => [...list, s]);
  }

  remove(symbol: string) {
    this.symbols.update((list) => list.filter((s) => s !== symbol));
  }

  private loadFromStorage(): string[] {
    if (!this.isBrowser) return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  }
}
