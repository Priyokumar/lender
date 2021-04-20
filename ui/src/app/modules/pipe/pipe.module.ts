import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InrPipe } from './inr.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    InrPipe
  ], exports:[
    InrPipe
  ]
})
export class PipeModule { }
