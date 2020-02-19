import { Addon } from '@materia/addons';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FirebaseAuthenticationComponent } from './components/firebase-authentication/firebase-authentication.component';
import { GetStartedComponent } from './components/firebase-authentication/get-started/get-started.component';
import {
  UserFormComponent,
  ConfirmModalComponent,
  FirebaseAuthenticationSetupComponent
} from './dialogs';

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

@Addon('@materia/firebase-authentication')
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ...UI_MODULES
  ],
  declarations: [
    FirebaseAuthenticationComponent,
    FirebaseAuthenticationSetupComponent,
    GetStartedComponent,
    UserFormComponent,
    ConfirmModalComponent
  ],
  exports: [
    FirebaseAuthenticationComponent,
    FirebaseAuthenticationSetupComponent
  ]
})
export class FirebaseAuthenticationModule {}
