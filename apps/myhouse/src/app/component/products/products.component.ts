import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponentimplements implements OnInit {
  ngOnInit(): void {
    console.log('products');
  }
  //
}
