import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/product';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  disabled?: boolean = true;

  constructor(private productsService: ProductsService, public cartService: CartService) { }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        const product = res[i];
        product["quantity"] = 1;
      }
      this.products = res;
      console.log(this.products);
    });
  }

  decreament(product: any) {
    if (product.quantity == 1) {
      this.disabled = true;
    }
    else {
      this.disabled = false;
      product.quantity --;
    }
    console.log(product);
  }

  increament(product: any) {
    product.quantity ++;
    console.log(product);
  }

}
