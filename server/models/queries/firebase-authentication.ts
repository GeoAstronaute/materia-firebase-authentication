import * as admin from 'firebase-admin';
import { FirebaseAdmin } from '../../lib/firebase-admin';

class FirebaseAuthenticationModel {
    firebaseAdminLib: FirebaseAdmin;

    constructor(private app, private entity) {
        this.firebaseAdminLib = new FirebaseAdmin(this.app);
    }

    tryAuth() {
        return this.firebaseAdminLib.tryAuth();
    }

    isAuth() {
        return this.firebaseAdminLib.auth ? Promise.resolve() : Promise.reject(new Error('Unable to initialize Firebase admin SDK'));
    }

    getAllUsers(params) {
        return this.list(params.nextPageToken);
    }

    list(nextPageToken, precedentListUsersResult?) {
        return this.isAuth().then(() => {
            return admin.auth().listUsers(1000, nextPageToken)
        }).then((listUsersResult) => {
            if (precedentListUsersResult) {
                listUsersResult.users = [...precedentListUsersResult.users, ...listUsersResult.users]
            }
            if (listUsersResult.pageToken) {
                return this.list(listUsersResult.pageToken, listUsersResult)
            } else {
                return listUsersResult.users;
            }
        })
    }

    getUsers(params) {
        return this.isAuth().then(() => {
            const nextPageToken = params.nextPageToken;
            return admin.auth().listUsers(1000, nextPageToken);
        }).then((listUsersResult) => {
            return listUsersResult.users;
        });
    }

    getUser(params) {
        return this.isAuth().then(() => {
            const uid = params.uid;
            return admin.auth().getUser(uid)
        }).then((userRecord) => userRecord.toJSON())
    }

    getUserByEmail(params) {
        return this.isAuth().then(() => {
            const email = params.email;
            return admin.auth().getUserByEmail(email)
        }).then((userRecord) => userRecord.toJSON())
    }

    createUser(params) {
        return this.isAuth().then(() => {
            const data = params;
            return admin.auth().createUser(data/*{
            email: "user@example.com",
            emailVerified: false,
            phoneNumber: "+11234567890",
            password: "secretPassword",
            displayName: "John Doe",
            photoURL: "http://www.example.com/12345678/photo.png",
            disabled: false
          }*/)
        })
    }

    updateUser(params) {
        return this.isAuth().then(() => {
            const uid = params.uid;
            const data = params;
            delete data.uid;
            return admin.auth().updateUser(uid, data)
        }).then((userRecord) => userRecord.toJSON());
    }

    deleteUser(params) {
        return this.isAuth().then(() => {
            const uid = params.uid;
            return admin.auth().deleteUser(uid).then(() => { return true; });
        });
    }
}

module.exports = FirebaseAuthenticationModel;