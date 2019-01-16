import * as admin from 'firebase-admin';
import { join } from 'path';
import { checkAndUpdateElementInline } from '@angular/core/src/view/element';

export class FirebaseAdmin {
    config: any;
    auth: boolean;

	constructor(private app) {
        this.tryAuth();
    }

    reloadConfig() {
        this.config = this.app.addons && this.app.addons.addonsConfig && this.app.addons.addonsConfig['@materia/firebase-authentication'] ? this.app.addons.addonsConfig['@materia/firebase-authentication'] : {};
    }

    tryAuth() {
        this.reloadConfig();
        if (this.config.path && this.config.databaseUrl) {
            let p = Promise.resolve();
            if (admin.apps.length) {
                p = p.then(() =>  admin.app().delete());
            }
            return p.then(() => {
                try {
                    const serviceAccount = require(join(this.app.path, this.config.path));
                    admin.initializeApp({
                        credential: admin.credential.cert(serviceAccount),
                        databaseURL: this.config.databaseUrl
                    });
                    this.auth = true;
                } catch (err) {
                    this.auth = false;
                }
                return {auth: this.auth};
            });
        } else {
            this.auth = false;
            return {auth: this.auth};
        }
    }
}