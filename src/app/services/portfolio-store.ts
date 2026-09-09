import { Service, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const STORAGE_KEY = 'stockwatch-portfolio-v2';

export interface Position {
  id: string;
  symbol: string;
  amountInvested: number;
  buyPrice: number;
}

@Service()
export class PortfolioStore {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly positions = signal<Position[]>(this.loadFromStorage());

  readonly list = this.positions.asReadonly();

  constructor() {
    effect(() => {
      const current = this.positions();
      if (this.isBrowser) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
      }
    });
  }

  add(symbol: string, amountInvested: number, buyPrice: number) {
    const s = symbol.trim().toUpperCase();
    if (!s || amountInvested <= 0 || buyPrice <= 0) return;

    const position: Position = {
      id: crypto.randomUUID(),
      symbol: s,
      amountInvested,
      buyPrice,
    };
    this.positions.update((list) => [...list, position]);
  }

  remove(id: string) {
    this.positions.update((list) => list.filter((p) => p.id !== id));
  }

  private loadFromStorage(): Position[] {
    if (!this.isBrowser) return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Position[]) : [];
    } catch {
      return [];
    }
  }
}
