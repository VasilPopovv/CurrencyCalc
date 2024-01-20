import { Component, OnInit, Output } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { CalcComponent } from './components/calc/calc.component';
import cc from 'currency-codes';
import { CoinsService } from './services/coins.service';
import { Icoins } from './models/coins';
import { CommonModule } from '@angular/common';
import { ErrorService } from './services/error.service';

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
      this.coins = c
        .map((i, index) => {
          if (index === 2) {
            return {
              currencyCodeA: 'UAH (Ukraine Hryvna)',
              currencyCodeB: 980,
              date: 1705664173,
              rateBuy: 1,
              rateSell: 1,
              value: 'UAH',
            };
          }
          return {
            ...i,
            currencyCodeA: `${
              cc.number(i.currencyCodeA.toString())?.code || 0
            } (${cc.number(i.currencyCodeA.toString())?.currency || 0})`,
            value: `${cc.number(i.currencyCodeA.toString())?.code}`,
          };
        })
        .filter((i) => i.currencyCodeA !== '0 (0)');
      if (this.coins.length) {
        this.coins.map((i, index) => {
          this.currency.set(
            i.value || index.toString(),
            i.rateSell || i.rateCross || index
          );
        });
        console.log(this.currency);
      }
    });
  }
}
