import { Component, OnInit, Output } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { CalcComponent } from './components/calc/calc.component';
import cc from 'currency-codes';
import { CoinsService } from './services/coins.service';
import { Icoins } from './models/coins';
import { CommonModule } from '@angular/common';
import { ErrorService } from './services/error.service';
import { parseCurrencys, createCurrencyMap } from './helpers/parseCurrencys';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [HeaderComponent, CalcComponent, CommonModule],
})
export class AppComponent implements OnInit {
  @Output() coins: Icoins[] | [];
  @Output() currency = new Map<string, number>();

  constructor(
    private coinsService: CoinsService,
    public errorServise: ErrorService
  ) {}

  ngOnInit() {
    this.coinsService.getCoins().subscribe((c) => {
      this.coins = parseCurrencys(c);
      this.currency = createCurrencyMap(this.coins)
      console.log(this.currency);
    });
  }
}
