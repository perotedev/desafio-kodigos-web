import { NgModule } from '@angular/core';
import {ContentList} from './content-list.component';
import {
  ClCellDirective,
  ClCellTemplateDirective,
  ClEmptyTemplateDirective, ClHeaderDirective,
} from './content-list-directives';

@NgModule({
  declarations: [],
  imports: [
    ContentList,
    ClCellTemplateDirective,
    ClHeaderDirective,
    ClCellDirective,
    ClEmptyTemplateDirective,
  ],
  exports: [
    ContentList,
    ClCellTemplateDirective,
    ClHeaderDirective,
    ClCellDirective,
    ClEmptyTemplateDirective,
  ]
})
export class ContentListModule { }
