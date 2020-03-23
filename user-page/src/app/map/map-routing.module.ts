import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './containers/map.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: MapComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule {}
