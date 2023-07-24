import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CarBrand, CarPayload, CarResponse, ComfortFeature, SecurityFeature} from "../model/car.model";

@Injectable({
  providedIn: 'root'
})
export class CarService {
  BASE_URL = 'https://636ce2d8ab4814f2b2712854.mockapi.io/';
  constructor(private http: HttpClient) { }

  carBrands():Observable<CarBrand[]> {
    return this.http.get<CarBrand[]>(`${this.BASE_URL}car-brands`);
  }

  securityFeatures(): Observable<SecurityFeature[]> {
    return this.http.get<SecurityFeature[]>(`${this.BASE_URL}car-security-features`);
  }

  comfortFeatures(): Observable<ComfortFeature[]> {
    return this.http.get<ComfortFeature[]>(`${this.BASE_URL}car-comfort-features`);
  }

  createCar(payload: CarPayload): Observable<CarResponse> {
    return this.http.post<CarResponse>(`${this.BASE_URL}cars`, payload);
  }
}
