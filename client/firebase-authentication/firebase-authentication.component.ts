
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AddonView } from '@materia/addons';
import { HttpClient } from '@angular/common/http';
import { FirebaseUser } from '../models/firebase-user.model';

@AddonView('@materia/firebase-authentication')
@Component({
    selector: 'materia-firebase-authentication',
    templateUrl: './firebase-authentication.component.html',
    styleUrls: ['./firebase-authentication.component.scss'],
    providers: []
})
export class FirebaseAuthenticationComponent implements OnInit {
    @Input() app;
    @Input() settings;
    @Input() baseUrl: string;

    @Output() openSetup = new EventEmitter<void>();
    users: FirebaseUser[];

    get hasSettings() {
        return this.settings && this.settings.path && this.settings.databaseUrl;
    }

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.runQuery('firebase-user', 'getAllUsers').then((result: any) => {
            this.users = result.data;
        });
    }

    private runQuery(entity: string, query: string, params?: any) {
        return this.http
          .post(`${this.baseUrl}/entities/${entity}/queries/${query}`, params)
          .toPromise();
      }
}
