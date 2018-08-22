import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MatButtonModule,
  MatRippleModule,
  MatSnackBarModule,
  MatCardModule,
  MatIconModule,
  MatDialogModule,
  MatInputModule,
  MatDividerModule,
  MatListModule,
  MatExpansionModule,
  MatBadgeModule,
  MatMenuModule,
  MatTooltipModule,
  MatSlideToggleModule,
  MatToolbarModule,
  MatProgressSpinnerModule
} from '@angular/material';

export const UI_MODULES = [
  MatButtonModule,
  MatRippleModule,
  MatSnackBarModule,
  MatCardModule,
  MatIconModule,
  MatDialogModule,
  MatInputModule,
  MatDividerModule,
  MatListModule,
  MatExpansionModule,
  MatBadgeModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule,
  MatToolbarModule,
  MatMenuModule,

  FlexLayoutModule
];

import { Addon } from '@materia/addons';

import { FirebaseAuthenticationComponent } from './firebase-authentication/firebase-authentication.component';
import { GetStartedComponent } from './firebase-authentication/get-started/get-started.component';
import { UserFormComponent } from './dialogs/user-form/user-form.component';
import { ConfirmModalComponent } from './dialogs/confirm-modal';

@Addon('@materia/firebase-authentication')
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ...UI_MODULES
  ],
  declarations: [FirebaseAuthenticationComponent, GetStartedComponent, UserFormComponent, ConfirmModalComponent],
  exports: [FirebaseAuthenticationComponent]
})
export class FirebaseAuthenticationModule {}
