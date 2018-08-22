import { Component, OnInit, Input, ViewChild, TemplateRef, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUser } from '../../models/firebase-user.model';

@Component({
  selector: 'fa-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnChanges {
  @Input() edit: boolean;
  @Input() user?: FirebaseUser;

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  @ViewChild('userForm') template: TemplateRef<any>;

  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {}

  ngOnChanges() {
    this.initForm();
  }

  initForm() {
    this.form = null;
    if (! this.edit) {
      this.form = this.fb.group({
        uid: '',
        email: ['', Validators.required],
        emailVerified: false,
        phoneNumber: '',
        password: ['', Validators.required],
        displayName: '',
        photoURL: '',
        disabled: false
      });
    } else {
      this.form = this.fb.group({
        uid: this.user.uid,
        email: [{value: this.user.email, disabled: true}, Validators.required],
        emailVerified: this.user.emailVerified,
        phoneNumber: this.user.phoneNumber,
        password: [this.user.password],
        displayName: this.user.displayName,
        photoURL: this.user.photoURL,
        disabled: this.user.disabled
      });
    }
    this.form.updateValueAndValidity();
  }
}
