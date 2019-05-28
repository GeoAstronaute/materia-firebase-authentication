import * as admin from 'firebase-admin';
import { FirebaseAdmin } from './lib/firebase-admin';

export default class FirebaseAuthentication {
    public static initialize: boolean;
    public static displayName = 'Firebase Authentication';
    public static logo =
    'https://raw.githubusercontent.com/materiahq/materia-website-content/master/logo/addons/firebase-authentication.png';

    firebaseAdminLib: FirebaseAdmin;

    constructor(private app: any) {}

    start() {
        this.firebaseAdminLib = new FirebaseAdmin(this.app);
        this.firebaseAdminLib.initialize();
        this._addPermission();
    }

    private _addPermission() {
        this.app.api.permissions.add({
            name: 'Firebase Connected User ID',
            description: 'Inject Firebase User uid',
            middleware: (req, res, next) => {
                // Authorization: Bearer
                if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                    // Handle token presented as a Bearer token in the Authorization header
                    const token = req.headers.authorization.split(' ')[1];
                    admin.auth().verifyIdToken(token)
                        .then((decodedToken) => {
                            const uid = decodedToken.uid;
                            if (req.method === 'get' || req.method === 'delete') {
                                req.query.id_user = uid;
                            } else {
                                req.body.id_user = uid;
                            }
                            return next();
                        }).catch(() => {
                            // Handle error
                            res.status(401).send(new Error('Unauthorized'));
                        });
                } else {
                    res.status(401).send(new Error('Unauthorized'));
                }
            },
            readOnly: true,
            fromAddon: this.app.addons.get('@materia/firebase-authentication').toJson()
        });
    }
}
