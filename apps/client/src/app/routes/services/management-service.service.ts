import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct, ProductResponse } from '../../types/product';

@Injectable({
  providedIn: 'root',
})
export class ManagementService {
  private apiUrl = 'http://localhost:3000/api/products';
  constructor(private http: HttpClient) {}

  public getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  public getAllProducts(page = 1, limit = 10): Observable<ProductResponse> {
    const params = new HttpParams().set('page', page).set('limit', limit);

    return this.http.get<ProductResponse>(this.apiUrl, {
      headers: this.getAuthHeaders(),
      params: params,
    });
  }

  public getProductById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  public addProduct(newProduct: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.apiUrl, newProduct, {
      headers: this.getAuthHeaders(),
    });
  }

  public updateProduct(
    id: string,
    updatedProduct: IProduct
  ): Observable<IProduct> {
    return this.http.patch<IProduct>(`${this.apiUrl}/${id}`, updatedProduct, {
      headers: this.getAuthHeaders(),
    });
  }

  public deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
