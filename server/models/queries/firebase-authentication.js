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
            listUsersResult.users.forEach((userRecord) => {
                console.log('user', userRecord.toJSON());
            });
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
                listUsersResult.users.forEach((userRecord) => {
                    console.log('user', userRecord.toJSON());
                });
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