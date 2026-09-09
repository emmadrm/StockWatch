import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SelectedStockStore } from '../services/selected-stock';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  private selectedStock = inject(SelectedStockStore);
  private router = inject(Router);

  searchInput = viewChild<ElementRef<HTMLInputElement>>('searchStock');

  onSearch() {
    const value = this.searchInput()?.nativeElement.value ?? '';
    if (!value.trim()) return;
    this.selectedStock.select(value);
    this.router.navigateByUrl('/');
  }
}
