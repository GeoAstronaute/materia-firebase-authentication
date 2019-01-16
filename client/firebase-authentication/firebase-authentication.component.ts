
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';

import { AddonView } from '@materia/addons';

import { FirebaseUser } from '../models/firebase-user.model';
import { UserFormComponent } from '../dialogs/user-form/user-form.component';
import { ConfirmModalComponent } from '../dialogs/confirm-modal';

@AddonView('@materia/firebase-authentication')
@Component({
    selector: 'fa-firebase-authentication',
    templateUrl: './firebase-authentication.component.html',
    styleUrls: ['./firebase-authentication.component.scss']
})
export class FirebaseAuthenticationComponent implements OnInit {
    @Input() app;
    @Input() settings;
    @Input() baseUrl: string;

    @Output() openSetup = new EventEmitter<void>();
    @Output() openInBrowser = new EventEmitter<string>();

    @ViewChild(UserFormComponent) userFormComp: UserFormComponent;
    @ViewChild(ConfirmModalComponent) confirmModComp: ConfirmModalComponent;

    users: FirebaseUser[];
    loadingUsers: boolean;
    userEdition: boolean;
    userDialog: any;

    providerIcons = {
        'google.com': 'http://www.gstatic.com/mobilesdk/160512_mobilesdk/auth_service_google.svg',
        'facebook.com': 'http://www.gstatic.com/mobilesdk/160409_mobilesdk/images/auth_service_facebook.svg',
        'password': 'http://www.gstatic.com/mobilesdk/160409_mobilesdk/images/auth_service_email.svg'
    };
    currentUser: any;
    firebaseError = false;
    firstLoad = true;

    get hasSettings() {
        return this.settings && this.settings.path && this.settings.databaseUrl;
    }

    constructor(private http: HttpClient, private dialog: MatDialog, private snackBar: MatSnackBar) { }

    ngOnInit() {
        this.listUsers();
    }

    tryAuth(): Promise<any> {
        return this.runQuery('firebase-user', 'initializeFirebaseAdmin');
    }

    listUsers() {
        this.firebaseError = false;
        this.loadingUsers = true;
        this.tryAuth()
            .then((result) => {
                if (result.data && result.data.length && result.data[0].auth) {
                   return this.runQuery('firebase-user', 'getAllUsers').then((result: any) => {
                    this.firstLoad = false;
                    this.users = result.data;
                    this.loadingUsers = false;
                });
                } else {
                    this.firstLoad = false;
                    this.loadingUsers = false;
                    this.firebaseError = true;
                }
            }).catch(() => {
                this.firstLoad = false;
                this.firebaseError = true;
                this.loadingUsers = false;
            });
    }

    newUser() {
        this.currentUser = null;
        this.userEdition = false;
        this.userDialog = this.dialog.open(this.userFormComp.template, { panelClass: 'no-padding' });
    }

    editUser(user) {
        this.userEdition = true;
        this.currentUser = Object.assign({}, user);
        this.userDialog = this.dialog.open(this.userFormComp.template, { panelClass: 'no-padding' });
    }

    closeUserDialog() {
        this.currentUser = null;
        this.userEdition = false;
        this.userDialog.close();
    }

    updateUser(user) {
        user = this.cleanUserForm(user);
        this.runQuery('firebase-user', 'updateUser', user).then(() => {
            this.userDialog.close();
            this.snackBar.open('User successfully updated', null, { duration: 1500 });
            this.listUsers();
        });
    }

    createUser(user) {
        user = this.cleanUserForm(user);
        if (!user.uid) {
            delete user.uid;
        }
        this.runQuery('firebase-user', 'createUser', user).then(() => {
            this.userDialog.close();
            this.snackBar.open('User successfully created', null, { duration: 1500 });
            this.listUsers();
        });
    }

    disableUser(user) {
        this.confirmModComp.message = `Are you sure you want to disable user: '${user.email}' ?`;
        this.confirmModComp.messageDetail = 'The user will no longer be able to login until his account is enabled.';
        this.confirmModComp.buttonNames = ['CANCEL', 'CONFIRM'];
        const confirmModal = this.dialog.open(this.confirmModComp.template);
        confirmModal.afterClosed().subscribe((result) => {
            if (result !== 'cancel') {
                const data = { uid: user.uid, disabled: true };
                this.runQuery('firebase-user', 'updateUser', data).then(() => {
                    this.snackBar.open('User account successfully disabled', null, { duration: 1500 });
                    this.listUsers();
                });
            }
        });
    }

    enableUser(user) {
        this.confirmModComp.message = `Are you sure you want to enable user: '${user.email}' ?`;
        this.confirmModComp.messageDetail = 'The user will be able to login.';
        this.confirmModComp.buttonNames = ['CANCEL', 'CONFIRM'];
        const confirmModal = this.dialog.open(this.confirmModComp.template);
        confirmModal.afterClosed().subscribe((result) => {
            if (result !== 'cancel') {
                const data = { uid: user.uid, disabled: false };
                this.runQuery('firebase-user', 'updateUser', data).then(() => {
                    this.snackBar.open('User account successfully enabled', null, { duration: 1500 });
                    this.listUsers();
                });
            }
        });
    }

    deleteUser(user) {
        this.confirmModComp.message = `Are you sure you want to delete user: '${user.email}' ?`;
        this.confirmModComp.messageDetail = 'this action is irreversible.';
        this.confirmModComp.buttonNames = ['CANCEL', 'CONFIRM'];
        const confirmModal = this.dialog.open(this.confirmModComp.template);
        confirmModal.afterClosed().subscribe((result) => {
            if (result !== 'cancel') {
                this.runQuery('firebase-user', 'deleteUser', user).then(() => {
                    this.snackBar.open('User successfully deleted', null, { duration: 1500 });
                    this.listUsers();
                });
            }
        });
    }

    private cleanUserForm(user) {
        if (!user.password) {
            delete user.password;
        }
        if (!user.displayName) {
            delete user.displayName;
        }
        if (!user.phoneNumber) {
            delete user.phoneNumber;
        }
        if (!user.photoURL) {
            delete user.photoURL;
        }
        return user;
    }

    private runQuery(entity: string, query: string, params?: any) {
        return this.http
            .post(`${this.baseUrl}/entities/${entity}/queries/${query}`, params)
            .toPromise();
    }
}
