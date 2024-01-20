import cc from 'currency-codes';
import { Icoins } from '../models/coins';

export const parseCurrencys = (c: Icoins[]) => {
  return c
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
        currencyCodeA: `${cc.number(i.currencyCodeA.toString())?.code || 0} (${
          cc.number(i.currencyCodeA.toString())?.currency || 0
        })`,
        value: `${cc.number(i.currencyCodeA.toString())?.code}`,
      };
    })
    .filter((i) => i.currencyCodeA !== '0 (0)');
};

export const createCurrencyMap = (coins: Icoins[]): Map<string, number> => {
  const currency = new Map();
  coins.map((i, index) => {
    currency.set(
      i.value || index.toString(),
      i.rateSell || i.rateCross || index
    );
  });
  return currency
};
