import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  product;
  categories = [];

  constructor(private productService: ProductService, private router: Router) {
    this.productService.getCategories().subscribe((categories: any) => this.categories = categories);
  }

  ngOnInit(): void {
    this.product = {
      name: '',
      category: '',
      price: 0,
      image: ''
    };
  }

  save() {
    this.productService.addNewProduct(this.product).subscribe(saved => {
      console.log('saved');
      this.router.navigate(['/admin']);
    });
  }
}
