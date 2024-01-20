export interface Icoins {
  currencyCodeA: number | string;
  currencyCodeB: number | string;
  date: number;
  rateBuy?: number;
  rateSell?: number;
  rateCross?: number
  value?: string
}
