import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Product {
  id?: number;
  name?: string;
  title?: string;
  description?: string;
  unitPrice?: number | string;
  imageUrl?: string;
  active?: boolean;
  unitsInStock?: number;
  dateCreated?: string;
  lastUpdate?: string;
  category?: unknown;
  _links?: { self?: { href?: string } };
}

export interface ProductCategory {
  id?: number;
  categoryName?: string;
  _links?: { self?: { href?: string } };
}

interface HalCollection<T> {
  _embedded?: Record<string, T[]>;
  _links?: Record<string, unknown>;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly apiBase = '/api';

  constructor(private readonly http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<HalCollection<Product>>(`${this.apiBase}/products`).pipe(
      map((response) => this.collectionItems<Product>(response, 'products'))
    );
  }

  getCategories(): Observable<ProductCategory[]> {
    return this.http.get<HalCollection<ProductCategory>>(`${this.apiBase}/product-category`).pipe(
      map((response) => this.collectionItems<ProductCategory>(response, 'productCategory'))
    );
  }

  searchProducts(name: string): Observable<Product[]> {
    const params = new HttpParams().set('name', name);
    return this.http.get<HalCollection<Product>>(`${this.apiBase}/products/search/findByNameContaining`, { params }).pipe(
      map((response) => this.collectionItems<Product>(response, 'products'))
    );
  }

  getProductsByCategory(categoryId: number): Observable<Product[]> {
    const params = new HttpParams().set('id', categoryId);
    return this.http.get<HalCollection<Product>>(`${this.apiBase}/products/search/findByCategoryId`, { params }).pipe(
      map((response) => this.collectionItems<Product>(response, 'products'))
    );
  }

  private collectionItems<T>(response: HalCollection<T> | T[], preferredKey: string): T[] {
    if (Array.isArray(response)) return response;
    const embedded = response?._embedded;
    if (!embedded) return [];
    if (Array.isArray(embedded[preferredKey])) return embedded[preferredKey];
    const firstArray = Object.values(embedded).find((value): value is T[] => Array.isArray(value));
    return firstArray ?? [];
  }
}
