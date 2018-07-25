import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatButtonModule,
  MatRippleModule,
  MatSnackBarModule,
  MatCardModule,
  MatIconModule,
  MatDialogModule,
  MatInputModule
} from '@angular/material';

import { Addon } from '@materia/addons';

import { AddonViewComponent } from './addon-view/addon-view.component';
import { AddonSetupComponent } from './addon-setup/addon-setup.component';

@Addon('@materia/firebase-authentication')
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatRippleModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule
  ],
  declarations: [AddonViewComponent, AddonSetupComponent],
  exports: [AddonViewComponent, AddonSetupComponent],
  entryComponents: [AddonSetupComponent]
})
export class FirebaseAuthenticationModule {}
