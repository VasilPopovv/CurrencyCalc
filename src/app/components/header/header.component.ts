import { Component, Input } from '@angular/core';
import { Icoins } from '../../models/coins';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() coins: Icoins[] 
}
