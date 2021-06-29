import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

///////////////////////////////////////////////////////////
//                                                       //
// Use this only for modules that are needed globally    //
//                                                       //
// Do not declare anything here. Only import and export! //
//                                                       //
///////////////////////////////////////////////////////////

/**
 * List of modules that are needed globally
 */
const SHARED_MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,

  // 3rd-party
  MaterialModule,
];

/**
 * List of modules that are needed globally
 */
@NgModule({
  declarations: [],
  imports: [...SHARED_MODULES],
  exports: [...SHARED_MODULES],
})
export class SharedModule {
  /** static method to be used in AppModule */
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        ...MaterialModule.forRoot().providers,
      ],
    };
  }
}
