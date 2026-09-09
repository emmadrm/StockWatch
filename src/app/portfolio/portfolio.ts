import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { PortfolioStore } from '../services/portfolio-store';
import { PortfolioPosition, PositionValue } from '../portfolio-position/portfolio-position';

@Component({
  imports: [FormsModule, DecimalPipe, PortfolioPosition],
  selector: 'app-portfolio',
  styleUrl: './portfolio.css',
  templateUrl: './portfolio.html',
})
export class Portfolio {
  private portfolioStore = inject(PortfolioStore);

  positions = this.portfolioStore.list;

  newSymbol = signal('');
  newAmountInvested = signal<number | null>(null);
  newBuyPrice = signal<number | null>(null);

  // τρέχουσα αξία/κέρδος ανά θέση, όπως το αναφέρει η κάθε app-portfolio-position
  // μόλις φορτώσει την τρέχουσα τιμή της μετοχής της
  private valuesById = signal<Record<string, PositionValue>>({});

  totalInvested = computed(() => this.positions().reduce((sum, p) => sum + p.amountInvested, 0));

  totalCurrentValue = computed(() => {
    const values = this.valuesById();
    return this.positions().reduce(
      (sum, p) => sum + (values[p.id]?.currentValue ?? p.amountInvested),
      0,
    );
  });

  totalGain = computed(() => this.totalCurrentValue() - this.totalInvested());

  totalGainPercent = computed(() => {
    const invested = this.totalInvested();
    return invested > 0 ? (this.totalGain() / invested) * 100 : 0;
  });

  onValueChange(value: PositionValue) {
    this.valuesById.update((current) => ({ ...current, [value.id]: value }));
  }

  addPosition() {
    const amountInvested = this.newAmountInvested();
    const buyPrice = this.newBuyPrice();
    if (!this.newSymbol() || !amountInvested || !buyPrice) return;

    this.portfolioStore.add(this.newSymbol(), amountInvested, buyPrice);
    this.newSymbol.set('');
    this.newAmountInvested.set(null);
    this.newBuyPrice.set(null);
  }

  remove(id: string) {
    this.portfolioStore.remove(id);
  }
}
