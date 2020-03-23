import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ListComponent } from './containers/list/list.component';
import { ListRoutingModule } from './list-routing.module';
import { CommonModule } from '@angular/common';
import { SearchPipe } from './pipes/search.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListComponent,
    SearchPipe
  ],
  imports: [
    ListRoutingModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ListModule {}
