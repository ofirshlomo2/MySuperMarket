import {Component, OnInit, TemplateRef} from '@angular/core';
import {ProductService} from '../product.service';
import {AuthService} from '../auth.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products = [];
  categories = [];
  selectedCategory = null;
  filteredProducts = [];
  user;
  searchText = '';
  productQuantity = 0;
  selectedProduct;
  modalRef: BsModalRef;
  isCheckout = false;


  constructor(private productService: ProductService, private authService: AuthService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.productService.getAll().subscribe((products: any) => {
      this.products = JSON.parse(JSON.stringify(products));
      this.filteredProducts = products;
    });
    this.productService.getCategories().subscribe((categories: any) => this.categories = categories);
  }

  selectCategory(category: any) {
    this.selectedCategory = category;
    if (category == -1) {
      this.filteredProducts = this.products;
      return;
    }

    this.filteredProducts = this.products.filter(p => p.category == category._id);
  }

  addToCart() {
    this.authService.addProductToCart(this.selectedProduct, this.productQuantity);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
