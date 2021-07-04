import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api';
  private onLoggedIn = new Subject();
  public onLoggedIn$ = this.onLoggedIn.asObservable();

  private onLoggedOut = new Subject();
  public onLoggedOut$ = this.onLoggedOut.asObservable();

  private onCartChanged = new Subject();
  public onCartChanged$ = this.onCartChanged.asObservable();

  constructor(private http: HttpClient, private  _router: Router) {
  }

  register(email, password, userId: string, city: string, street: string, fullName: string) {
    return this.http.post(this.baseUrl + '/register', {email, password, userId, city, street, fullName});
  }

  login(email, password) {
    return this.http.post(this.baseUrl + '/login', {email, password});
  }

  onUserLoggedIn(user) {
    this.onLoggedIn.next(user);
  }

  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user'));
    }
    return null;
  }

  checkIfIdExist(userId) {
    return this.http.get(`${this.baseUrl}/checkIfIdExist/${userId}`);
  }

  getCart() {
    if (localStorage.getItem('cart')) {
      return JSON.parse(localStorage.getItem('cart'));
    }
    return null;
  }

  createCart() {
    const cart = {
      products: {},
      total: 0
    };


    localStorage.setItem('cart', JSON.stringify(cart));
  }

  addProductToCart(product, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart'));

    if (cart.products[product._id]) {
      cart.products[product._id].quantity += quantity;
    } else {
      cart.products[product._id] = {product, quantity};
    }
    cart.total = this.getCartTotal(cart);

    localStorage.setItem('cart', JSON.stringify(cart));
    this.onCartChanged.next(cart);
  }

  private getCartTotal(cart) {
    let sum = 0;
    Object.keys(cart.products).forEach(key => {
      sum += (cart.products[key].product.price * cart.products[key].quantity);
    });
    return sum;
  }

  removeProduct(product) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    delete cart.products[product._id];
    cart.total = this.getCartTotal(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.onCartChanged.next(cart);
  }

  logout() {
    localStorage.clear();
    this.onLoggedOut.next();
    this._router.navigate(['/login']);
  }


}
