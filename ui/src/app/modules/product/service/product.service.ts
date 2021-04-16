import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoint, IActionResponse } from '../../shared/model/shared.model';
import { IProduct } from '../product.model';

@Injectable()
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<any>(ApiEndpoint.PRODUCTS);
  }

  getProductById(id: number): Observable<IProduct> {
    return this.http.get<any>(ApiEndpoint.PRODUCTS + "/" + id);
  }

  createProduct(product: IProduct): Observable<IActionResponse> {
    return this.http.post<IActionResponse>(ApiEndpoint.PRODUCTS, product);
  }

  updateProduct(product: IProduct, id: number): Observable<IActionResponse> {
    return this.http.put<IActionResponse>(ApiEndpoint.PRODUCTS + "/" + id, product);
  }

  deleteProduct(id: number): Observable<IActionResponse> {
    return this.http.delete<IActionResponse>(ApiEndpoint.PRODUCTS + "/" + id);
  }

}
