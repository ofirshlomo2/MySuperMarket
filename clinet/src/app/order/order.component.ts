import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {OrdersService} from '../orders.service';
import {AuthService} from '../auth.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

declare var window: any;

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
    let fileJson = {products: []};
    this.populatedOrder.products.forEach(p => {
      fileJson.products.push(p.name);
    });
    fileJson.products.push(cart.total);


    var filename = 'download.txt';
    var blob = new Blob([JSON.stringify(fileJson)], {type: 'text/plain'});
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      var e:any = document.createEvent('MouseEvents'),
        a = document.createElement('a');
      a.download = filename;
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
    }
  }
}
