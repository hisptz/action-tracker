import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { modules } from './modules';

@NgModule({
  imports: [CommonModule, ...modules],
  exports: [...modules],
  declarations: []
})
export class SharedModule {}
