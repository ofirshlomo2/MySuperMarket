import {Component, OnInit} from '@angular/core';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  products = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.getAll().subscribe((products: any) => this.products = products);
  }

}
