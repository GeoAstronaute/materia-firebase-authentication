var admin = require('firebase-admin');

class FirebaseAuthenticationModel {
	constructor(app, entity) {
		this.app = app;
		this.entity = entity;
	}

    getAllUsers(params) {
        return this.list(params.nextPageToken);       
    }

    list(nextPageToken, precedentListUsersResult) {
        return admin.auth().listUsers(1000, nextPageToken).then((listUsersResult) => {
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
        const nextPageToken = params.nextPageToken;
        return admin.auth().listUsers(1000, nextPageToken)
            .then((listUsersResult) => {
                return listUsersResult.users;
            })
            .catch((error) => {
                console.log('Error listing users:', error);
                return error;
            });
    }

    getUser(params) {
        const uid = params.uid;
        return admin.auth().getUser(uid)
        .then((userRecord) => userRecord.toJSON())
        .catch((err) => err);
    }

    getUserByEmail(params) {
        const email = params.email;
        return admin.auth().getUserByEmail(email)
        .then((userRecord) => userRecord.toJSON())
        .catch((err) => err);
    }

    createUser(params) {
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
    }

    updateUser(params) {
        const uid = params.uid;
        const data = params;
        delete data.uid;
        return admin.auth().updateUser(uid, data)
        .then((userRecord) => userRecord.toJSON())
        .catch((err) => err);
    }

    deleteUser(params) {
        const uid = params.uid;
        return admin.auth().deleteUser(uid)
        .then(() => {
            return true;
        })
        .catch((err) => err);
    }
}

module.exports = FirebaseAuthenticationModel;