import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartProducts: any[] = [];
  cartString: any = [];
  totalPrice: any = 0;
  clientName: any;

  constructor() { }

  addToCart(product: any) {
    if (localStorage.getItem('cart')) {
      const products = this.cartProducts;
      var result = products.find((item: any) => {
        return item.cartProduct.id === product.id;
      });
      if (result) {
        const newArr = products.map((item: any) => {
          if (item.cartProduct.id === product.id) {
            item.cartProduct.quantity++;
            console.log(item.cartProduct.quantity)
            // item.itemTotalPrice = item.quantity * parseInt(item.cartProduct.price);
          }
          return item;
        })
        localStorage.setItem('cart', JSON.stringify(newArr));
      }
      else {
        this.cartProducts= [...this.cartProducts, { 'cartProduct': product }];
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      }
    }
    else {
      // this.cartProducts.push({ 'cartProduct': product });
      this.cartProducts = [{ 'cartProduct': product }];
      this.cartString = JSON.stringify(this.cartProducts);
      localStorage.setItem('cart', this.cartString);
    }
    alert('Added to cart!')
  }

  removeFromCart(product: any, i: number): void {
    this.cartProducts.splice(i, 1);
    this.cartString = JSON.stringify(this.cartProducts);
    localStorage.setItem('cart', this.cartString);
    this.calcTotalPrice();
  }

  calcTotalPrice() {
    this.totalPrice = 0;
    for(let i = 0; i < this.cartProducts.length; i++) {
      // console.log(this.cartProducts[i].cartProduct);
      const itemPrice = this.cartProducts[i].cartProduct.quantity * this.cartProducts[i].cartProduct.price;
      this.totalPrice += itemPrice;
    }
  }

}
