import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Icoins } from '../models/coins';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class CoinsService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
    ) {}

  getCoins(): Observable<Icoins[]> {
    return this.http
      .get<Icoins[]>('https://api.monobank.ua/bank/currency')
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message);
  }
}
