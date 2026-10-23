import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product, ProductCategory, ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  products: Product[] = [];
  categories: ProductCategory[] = [];
  searchText = '';
  selectedCategory = 'all';
  loading = true;
  errorMessage = '';
  selectedProduct: Product | null = null;

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getCategories().subscribe({
      next: (items) => this.categories = items,
      error: () => this.categories = []
    });
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.errorMessage = '';
    const query = this.searchText.trim();
    const categoryId = this.selectedCategory;

    const request = query
      ? this.productService.searchProducts(query)
      : categoryId !== 'all'
        ? this.productService.getProductsByCategory(Number(categoryId))
        : this.productService.getProducts();

    request.subscribe({
      next: (items) => {
        this.products = items;
        this.loading = false;
      },
      error: (error: unknown) => {
        console.error('Could not load products:', error);
        this.products = [];
        this.loading = false;
        this.errorMessage = 'Could not connect to the Products API. Make sure the Spring Boot backend and database are running.';
      }
    });
  }

  onSearch(): void {
    this.loadProducts();
  }

  onCategoryChange(): void {
    this.loadProducts();
  }

  clearFilters(): void {
    this.searchText = '';
    this.selectedCategory = 'all';
    this.loadProducts();
  }

  openProduct(product: Product): void {
    this.selectedProduct = product;
  }

  closeProduct(): void {
    this.selectedProduct = null;
  }

  productName(product: Product): string {
    return product.name?.trim() || product.title?.trim() || 'Untitled product';
  }

  productPrice(product: Product): number | null {
    if (product.unitPrice === undefined || product.unitPrice === null || product.unitPrice === '') return null;
    const value = Number(product.unitPrice);
    return Number.isFinite(value) ? value : null;
  }

  imageUrl(product: Product): string {
    return product.imageUrl?.trim() || 'https://placehold.co/600x420/f1f5f9/64748b?text=Product+Image';
  }

  onImageError(event: Event): void {
    const image = event.target as HTMLImageElement;
    image.src = 'https://placehold.co/600x420/f1f5f9/64748b?text=Product+Image';
  }

  trackByProduct(index: number, product: Product): number | string {
    return product.id ?? index;
  }
}
