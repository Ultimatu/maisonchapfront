import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {House} from "./models";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  baseUrl = 'http://localhost:8080/api/public/houses';
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<House[]>(`${this.baseUrl}/all`);
  }

  getAllRentingProducts() {
    return this.http.get<House[]>(`${this.baseUrl}/renting`);
  }

  getAllSellingProducts() {
    return this.http.get<House[]>(`${this.baseUrl}/selling`);
  }



  /**
   * Get one house by id
   * @param id
   */

  getOneProduct(id: number) {
    return this.http.get<House>(`${this.baseUrl}/get-all-by-house-id/${id}`);
  }


  /**
   * Get all houses by user
   * @param id
   */
  getAllUserPhotos(id: number): Observable<House[]> {
    return this.http.get<House[]>(`${this.baseUrl}/by-user/${id}`);
  }


  /**
   * Get all houses by availability
   * @param status
   */
  getAllByAvailability(status: boolean): Observable<House[]> {
    return this.http.get<House[]>(`${this.baseUrl}/by-disponibility/${status}`);
  }




}
