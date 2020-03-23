import { NgModule } from '@angular/core';
import { MapComponent } from './containers/map.component';
import { MapRoutingModule } from './map-routing.module';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../list/pipes/search.pipe';

@NgModule({
  declarations: [
    MapComponent,
    SearchPipe
  ],
  imports: [
    MapRoutingModule,
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCazK8T_u2MeORxNiva9hIt-i4-KcX5ljE'
    })
  ],
  providers: []
})
export class MapModule {}
