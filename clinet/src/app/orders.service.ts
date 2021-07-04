import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {
  }

  CheckOrderAvailability(date: Date) {
    return this.http.post(this.baseUrl + '/orders/check', {date});
  }

  create(order) {
    return this.http.post(this.baseUrl + '/orders', order);
  }
}
