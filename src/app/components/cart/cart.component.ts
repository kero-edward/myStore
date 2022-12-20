import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart?: any = [];
  products?: any = [];
  disabled: boolean = false;
  order: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    address: new FormControl('', [Validators.required, Validators.minLength(6)]),
    creditCard: new FormControl(null, [Validators.required, Validators.pattern('[0-9]{16}$')])
  });

  constructor(public cartService: CartService, private router: Router) {
    this.cart = localStorage.getItem('cart');
    this.cartService.cartProducts = JSON.parse(this.cart);
    // console.log(this.products[0].cartProduct);
  }

  ngOnInit(): void {
    this.cartService.calcTotalPrice();
  }

  submitForm(order: FormGroup) {
    this.cartService.clientName = this.order.get('fullName');
    this.cartService.cartProducts = new Array;
    this.router.navigate(['/confirmation']);
    localStorage.setItem('cart', JSON.stringify(this.cartService.cartProducts));
  }

  decreament(product: any) {
    if (product.quantity == 1) {
      this.disabled = true;
    }
    else {
      this.disabled = false;
      product.cartProduct.quantity --;
      this.cartService.calcTotalPrice();
    }
  }

  increament(product: any) {
    product.cartProduct.quantity ++;
    this.cartService.calcTotalPrice();
    // console.log(product);
  }

}
