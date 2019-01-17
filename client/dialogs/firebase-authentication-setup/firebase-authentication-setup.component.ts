import { AddonSetup } from '@materia/addons';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IFirebaseAuthenticationSettings } from '../../models/firebase-authentication-settings.model';

@AddonSetup('@materia/firebase-authentication')
@Component({
  selector: 'fa-firebase-authentication-setup',
  templateUrl: './firebase-authentication-setup.component.html',
  styleUrls: ['./firebase-authentication-setup.component.scss']
})
export class FirebaseAuthenticationSetupComponent implements OnInit {
  @Input() app;
  @Input() settings: IFirebaseAuthenticationSettings;

  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  settingsForm: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.settingsForm = this.fb.group({
      serviceAccountCredentialsPath: [this.settings.serviceAccountCredentialsPath, Validators.required],
      databaseUrl: [this.settings.databaseUrl, Validators.required]
    });
  }

  onSave() {
    if (this.settingsForm.valid) {
      this.save.emit(this.settingsForm.value);
    }
  }

}
