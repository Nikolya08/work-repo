import { forwardRef, NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './containers/profile/profile.component';
import { MainComponent } from './containers/main/main.component';
import { UserService } from './services/user.service';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ProfileComponent,
    MainComponent,
    HeaderComponent
  ],
  providers: [
    UserService,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ProfileComponent),
    }
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class MainModule {}
