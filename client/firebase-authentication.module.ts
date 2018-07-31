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
  MatBadgeModule
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

  FlexLayoutModule
];

import { Addon } from '@materia/addons';

import { FirebaseAuthenticationComponent } from './firebase-authentication/firebase-authentication.component';

@Addon('@materia/firebase-authentication')
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ...UI_MODULES
  ],
  declarations: [FirebaseAuthenticationComponent],
  exports: [FirebaseAuthenticationComponent]
})
export class FirebaseAuthenticationModule {}
