import { ObserversModule } from '@angular/cdk/observers';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

/** Array of modules */
const MATERIAL_MODULES = [
  MatButtonModule,
  MatToolbarModule,
];

/** Array of modules */
const CDK_MODULES = [ObserversModule, OverlayModule, PortalModule, ScrollingModule];

/** Wrapper Module for Angular Material */
@NgModule({
  imports: [CDK_MODULES, MATERIAL_MODULES],
  exports: [CDK_MODULES, MATERIAL_MODULES],
})
export class MaterialModule {
  /** static method, to be used in SharedModule only */
  static forRoot(): ModuleWithProviders<MaterialModule> {
    return {
      ngModule: MaterialModule,
      providers: [
        // angular material
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }, // standard, fill, outline
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000 } },
      ],
    };
  }
}
