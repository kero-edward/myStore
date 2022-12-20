import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/Models/product';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId?: number;
  product: Product[] = [];
  myProduct: any;
  disabled?: boolean = true;

  constructor(private productService: ProductsService, private route: ActivatedRoute, public cartService: CartService) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    console.log(this.productId);
    this.productService.getProducts().subscribe({
      next: (res) => {
        for (let i = 0; i < res.length; i++) {
          const product = res[i];
          product["quantity"] = 1;
        }
        this.product = res.filter((item:any)=>{
          return item.id === Number(this.productId);
        });
        this.myProduct = this.product[0];
        console.log(this.myProduct);
      }
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
