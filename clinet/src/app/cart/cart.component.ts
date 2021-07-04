import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Output() onCheckOutClicked = new EventEmitter();
  public isCheckOut = false;
  cart = {
    products: {},
    total: 0
  };


  constructor(private authService: AuthService) {

    this.authService.onCartChanged$.subscribe((cart: any) => {
      this.cart = cart;
    });
  }

  ngOnInit(): void {
    this.cart = this.authService.getCart();
  }

  removeProduct(product) {
    this.authService.removeProduct(product);
  }

  checkoutClick() {
    this.onCheckOutClicked.emit();
    this.isCheckOut = true;
  }

  backToShop() {
    this.isCheckOut = false;
    this.onCheckOutClicked.emit();
  }
}
