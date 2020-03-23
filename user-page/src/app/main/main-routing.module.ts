import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './containers/profile/profile.component';
import { ROUTES_STRINGS } from '../constants/routing';
import { MainComponent } from './containers/main/main.component';

const routes: Routes = [
  {
    path: ROUTES_STRINGS.MAIN,
    component: MainComponent,
    children: [
      {
        path: ROUTES_STRINGS.PROFILE,
        component: ProfileComponent
      },
      {
        path: ROUTES_STRINGS.LIST,
        loadChildren: () => import('../list/list.module').then(m => m.ListModule)
      },
      {
        path: ROUTES_STRINGS.MAP,
        loadChildren: () => import('../map/map.module').then(m => m.MapModule)
      },
      {
        path: '',
        redirectTo: ROUTES_STRINGS.PROFILE,
        pathMatch: 'full'
      },
      {
        path: '**',
        component: ProfileComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(
    routes,
  )],
  exports: [RouterModule]
})
export class MainRoutingModule {}
