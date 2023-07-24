import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const ROUTES: Routes = [
  {
    /**
    I have an idea to give car path here and create feature module car
    but decided to follow 100% orders
    "Make a page under “/car-form” route" - just in the case
     */
    path: 'car-form',
    loadChildren: () => import('./car/car.module').then(m => m.CarModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
