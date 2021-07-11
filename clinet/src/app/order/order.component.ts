import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {OrdersService} from '../orders.service';
import {AuthService} from '../auth.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

declare var window: any;
declare var CreateObject: any;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @ViewChild('orderSuccess') orderSuccess: TemplateRef<any>;
  cities = ['Jerusalem', 'Tel Aviv', 'Haifa'];
  city = '';
  street = '';
  creditCard = '';
  shippingDate = new Date();
  user;
  modalRef: BsModalRef;
  private populatedOrder;
  textFileLink = '';

  constructor(private orderService: OrdersService, private authService: AuthService, private modalService: BsModalService) {

  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.street = this.user.street;
    this.city = this.user.city;
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
        products: Object.keys(cart.products).map(key => key),
        amount: cart.total
      };
    //
    this.orderService.create(order).subscribe(res => {
      this.populatedOrder = res;
      this.openModal();
    });
  }

  openModal() {
    this.modalRef = this.modalService.show(this.orderSuccess);
  }

  confirmOrder() {

  }

  generateTextFile() {
    const cart = this.authService.getCart();
    let text = '';
    this.populatedOrder.products.forEach(p => {
      text += p.name += '\r\n';
    });
    text += cart.total += '\r\n';

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', 'order.txt');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);

  }
}
