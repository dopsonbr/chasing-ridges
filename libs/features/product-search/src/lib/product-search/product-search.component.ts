import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NzCarouselModule, NzCarouselComponent } from 'ng-zorro-antd/carousel';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { Product } from '@chasing-ridges/products';

@Component({
  selector: 'lib-product-search',
  standalone: true,
  imports: [
    CommonModule,
    NzCarouselModule,
    NzCardModule,
    NzGridModule,
    NzButtonModule,
    NzNotificationModule
  ],
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {
  @ViewChild('carousel') carousel!: NzCarouselComponent;
  featuredProducts: Product[] = [];
  products: Product[] = [];

  constructor(
    private http: HttpClient,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    // Load featured products
    this.http.get<Product[]>('/api/products/featured').subscribe(
      products => this.featuredProducts = products
    );

    // Load all products
    this.http.get<Product[]>('/api/products').subscribe(
      products => this.products = products
    );
  }

  prevSlide() {
    this.carousel.pre();
  }

  nextSlide() {
    this.carousel.next();
  }

  addToCart(product: Product) {
    // Show notification when product is added
    this.notification.success(
      'Added to Cart',
      `${product.name} has been added to your cart`,
      { nzDuration: 3000 }
    );
  }
}
