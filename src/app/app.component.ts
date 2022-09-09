import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Cryptocurrency {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  cryptocurrencyes: Cryptocurrency[] = [];
  filteredCcys: Cryptocurrency[] = [];
  titles: string[] = [
    '#',
    'cryptocurrency',
    'Price',
    'Price Change',
    '24h Volume',
  ];

  searchText: string = '';

  constructor(private http: HttpClient) {}

  searchCcy() {
    console.log(this.searchText);
    this.filteredCcys = this.cryptocurrencyes.filter((ccy) => {
      return (
        ccy.name
          .toLocaleLowerCase()
          .includes(this.searchText.toLocaleLowerCase()) ||
        ccy.symbol
          .toLocaleLowerCase()
          .includes(this.searchText.toLocaleLowerCase())
      );
    });
  }

  ngOnInit(): void {
    this.http
      .get<Cryptocurrency[]>(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          this.cryptocurrencyes = res;
          this.filteredCcys = res;
        },
        error: (err) => console.log(err),
      });
  }
}
