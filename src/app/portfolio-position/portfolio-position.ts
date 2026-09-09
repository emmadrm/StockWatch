import { Component, computed, effect, inject, input, output, resource } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { Stock } from '../services/stock';
import type { Position } from '../services/portfolio-store';

export interface PositionValue {
  id: string;
  currentValue: number;
  gain: number;
}

@Component({
  imports: [DecimalPipe],
  selector: 'app-portfolio-position',
  styleUrl: './portfolio-position.css',
  templateUrl: './portfolio-position.html',
})
export class PortfolioPosition {
  private stockService = inject(Stock);

  position = input.required<Position>();
  remove = output<string>();
  valueChange = output<PositionValue>();

  quote = resource({
    params: () => ({ symbol: this.position().symbol }),
    loader: ({ params }) => firstValueFrom(this.stockService.getQuote(params.symbol)),
  });

  // ποσότητα μετοχών (μπορεί να είναι δεκαδική, όπως στις πραγματικές fractional-share αγορές)
  quantity = computed(() => this.position().amountInvested / this.position().buyPrice);

  currentValue = computed(() => {
    const price = this.quote.value()?.c;
    return price != null ? price * this.quantity() : null;
  });

  gain = computed(() => {
    const current = this.currentValue();
    return current != null ? current - this.position().amountInvested : null;
  });

  gainPercent = computed(() => {
    const g = this.gain();
    const invested = this.position().amountInvested;
    return g != null && invested > 0 ? (g / invested) * 100 : null;
  });

  constructor() {
    effect(() => {
      const currentValue = this.currentValue();
      const gain = this.gain();
      if (currentValue != null && gain != null) {
        this.valueChange.emit({ id: this.position().id, currentValue, gain });
      }
    });
  }
}
