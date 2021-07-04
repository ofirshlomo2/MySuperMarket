import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {
  }


  addNewProduct(product) {
    return this.http.post(this.baseUrl + '/products', product);
  }

  getAll() {
    return this.http.get(this.baseUrl + '/products');
  }

  getCategories() {
    return this.http.get(this.baseUrl + '/categories');
  }
}


