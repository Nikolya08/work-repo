import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './containers/login/login.component';
import { ROUTES_STRINGS } from '../constants/routing';
import { RegistryComponent } from './containers/registry/registry.component';

const routes: Routes = [
  {
  path: ROUTES_STRINGS.LOGIN,
  component: LoginComponent
  },
  {
    path: ROUTES_STRINGS.REGISTER,
    component: RegistryComponent
  },
  {
    path: ROUTES_STRINGS.MAIN,
    loadChildren: () => import('../main/main.module').then(m => m.MainModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
