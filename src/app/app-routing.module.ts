import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  { path: 'products', component: ProductsComponent},
  { path: 'products/:id', component: ProductDetailsComponent},
  { path: 'cart', component: CartComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: '', component: ProductsComponent, pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
