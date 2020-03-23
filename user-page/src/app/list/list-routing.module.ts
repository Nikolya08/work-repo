import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './containers/list/list.component';
import { NgModule } from '@angular/core';


const routes: Routes = [
  {
    path: '',
    component: ListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule {}
