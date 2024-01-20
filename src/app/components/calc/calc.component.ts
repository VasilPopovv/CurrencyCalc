import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NgFor } from '@angular/common';
import { Icoins } from '../../models/coins';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrl: './calc.component.css',
  standalone: true,
  imports: [HeaderComponent, NgFor, ReactiveFormsModule, FormsModule],
})
export class CalcComponent {
  @Input() coins: Icoins[]
  @Input() currency :Map<string, number>
  inputOne: number = 1;
  inputTwo: number = 1;
  selectOne: string = 'USD';
  selectTwo: string = 'USD';

  onChange(e: any) {
    if (e.target.name === 'one') {
      this.selectOne = e.target.value;
      this.convertTwo();
    }
    if (e.target.name === 'two') {
      this.selectTwo = e.target.value;
      this.convertOne();
    }
  }

  converter(from: string, to: string, quantity: number): number {
    return (
      +(((this.currency.get(from) || 1) * quantity) / (this.currency.get(to) || 1)).toFixed(2)
    );
  }

  convertOne() {
    this.inputTwo = this.converter(
      this.selectOne,
      this.selectTwo,
      this.inputOne
    )
  }

  convertTwo() {
    this.inputOne = this.converter(
      this.selectTwo,
      this.selectOne,
      this.inputTwo
    )
  }
}
