import * as admin from 'firebase-admin';
import { join } from 'path';

export class FirebaseAdmin {
  static auth: boolean;
  static config: any;

  config: any;

  constructor(private app) {}

  reloadConfig() {
    this.config =
      this.app.addons &&
      this.app.addons.addonsConfig &&
      this.app.addons.addonsConfig['@materia/firebase-authentication']
        ? this.app.addons.addonsConfig['@materia/firebase-authentication']
        : {};
  }

  initialize(): Promise<any> {
    this.reloadConfig();
    if (this.config.path && this.config.databaseUrl) {
      let p = Promise.resolve();
      if (!FirebaseAdmin.auth || (FirebaseAdmin.auth && this.configChanges())) {
        if (admin.apps.length) {
          p = p.then(() => admin.app().delete());
        }
        return p.then(() => {
          try {
            const serviceAccount = require(join(
              this.app.path,
              this.config.path
            ));
            admin.initializeApp({
              credential: admin.credential.cert(serviceAccount),
              databaseURL: this.config.databaseUrl
            });
            FirebaseAdmin.auth = true;
            FirebaseAdmin.config = {
              path: join(this.app.path, this.config.path),
              databaseUrl: this.config.databaseUrl
            };
          } catch (err) {
            FirebaseAdmin.auth = false;
          }
          return { auth: FirebaseAdmin.auth };
        });
      }
      return p.then(() => ({ auth: FirebaseAdmin.auth }));
    } else {
      FirebaseAdmin.auth = false;
      return Promise.resolve({ auth: FirebaseAdmin.auth });
    }
  }

  configChanges() {
    if (FirebaseAdmin.config && this.config) {
      return (
        FirebaseAdmin.config.path !== join(this.app.path, this.config.path) ||
        FirebaseAdmin.config.databaseUrl !== this.config.databaseUrl
      );
    }
  }
}
