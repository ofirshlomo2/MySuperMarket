import {Component, OnInit} from '@angular/core';
import {OrdersService} from '../orders.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  cities = ['Jerusalem', 'Tel Aviv', 'Haifa'];
  city = '';
  street = '';
  creditCard = '';
  shippingDate = new Date();
  user;

  constructor(private orderService: OrdersService, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  onDateChange() {

  }

  createOrder() {
    const cart = this.authService.getCart();
    const order =
      {
        street: this.street,
        city: this.city,
        creditCard: this.creditCard,
        shippingDate: this.shippingDate,
        user: this.user._id,
        products: Object.keys(cart.products).map(key => key)
      };
    this.orderService.create(order).subscribe(res => {
      alert('order saved');
    });
  }
}
