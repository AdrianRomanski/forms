import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { CarFormComponent } from './components/car-form/car-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { CarFormContainerComponent } from './containers/car-form-container/car-form-container.component';
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";

const ROUTES: Routes = [
  {
    /**
      I have an idea to give car-form path here and create feature module car/car-form
      but decided to follow 100% orders
      "Make a page under “/car-form” route" - just in the case
     */
    path: '',
    component: CarFormContainerComponent
  }
];

@NgModule({
  declarations: [
    CarFormComponent,
    CarFormContainerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
  ],
  exports: [
    CarFormComponent
  ]
})
export class CarModule { }
