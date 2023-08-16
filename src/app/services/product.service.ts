import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl: string = 'http://localhost:8000/api';
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/getAll`);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/getbyid/${id}`);
  }

  createProduct(product: Product): Observable<any>{
    console.log("Inside createProduct" , product);
    
    return this.http.post(`${this.baseUrl}/create`, product);
  }

  updateProduct(product: Product): Observable<any>{
    return this.http.put(`${this.baseUrl}/update`, product);
  }

  deleteProduct(id: string): Observable<any>{
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  // createProduct(name: string , description: string , price: number){
  //   let product = new Product();
  //   product.productName = name; 
  //   product.description = description;
  //   product.price = price;
  // }
}
