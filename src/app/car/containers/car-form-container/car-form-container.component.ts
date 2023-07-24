import { Component, OnInit } from '@angular/core';
import {CarService} from "../../services/car.service";
import {first, map, Observable, of, switchMap, zip} from "rxjs";
import {
  CarBrand,
  CarFormData,
  CarPayload,
  CarView,
  ComfortFeature,
  SecurityFeature
} from "../../model/car.model";

@Component({
  selector: 'app-car-form-container',
  templateUrl: './car-form-container.component.html',
  styleUrls: ['./car-form-container.component.scss']
})
export class CarFormContainerComponent implements OnInit {
  formData$!: Observable<CarFormData>
  lastCreatedCar$!: Observable<CarView>;

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    const carBrands$: Observable<CarBrand[]> = this.carService.carBrands();
    const comfortFeatures$: Observable<ComfortFeature[]> = this.carService.comfortFeatures();
    const securityFeatures$: Observable<SecurityFeature[]> = this.carService.securityFeatures();

    this.formData$ = this.initializeFormData(carBrands$, comfortFeatures$, securityFeatures$)
  }

  onSubmitClicked(payload: CarPayload): void {
    this.lastCreatedCar$ = this.carService.createCar(payload).pipe(
      switchMap(({model, description}) => of({model, description} as CarView))
    )
  }

  private initializeFormData(
    carBrands$: Observable<CarBrand[]>,
    comfortFeatures$: Observable<ComfortFeature[]>,
    securityFeatures$: Observable<SecurityFeature[]>
  ): Observable<CarFormData> {
    return zip([carBrands$, comfortFeatures$, securityFeatures$]).pipe(
      first(([brands, comfortFeatures, securityFeatures]: [CarBrand[], ComfortFeature[], SecurityFeature[]]) =>
        this.dataPresent(brands, comfortFeatures, securityFeatures)
      ),
      map(([brands, comfortFeatures, securityFeatures]: [CarBrand[], ComfortFeature[], SecurityFeature[]]) => {
          return {brands, comfortFeatures, securityFeatures} as CarFormData;
        }
      )
    );
  }

  private dataPresent(
    brands: CarBrand[],
    comfortFeatures: ComfortFeature[],
    securityFeatures: SecurityFeature[]
  ): boolean {
    return brands.length > 0 && comfortFeatures.length > 0 && securityFeatures.length > 0;
  }
}

