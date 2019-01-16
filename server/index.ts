import * as admin from 'firebase-admin';
import * as path from 'path';

export default class FirebaseAuthentication {
    public static initialize: boolean;
    public static displayName = 'Firebase Authentication';
    public static logo = 'https://raw.githubusercontent.com/materiahq/materia-website-content/master/logo/addons/firebase-authentication.png';


    public static installSettings = [{
            name: 'path',
            description: 'Relative path to your firebase service account key file .json',
            type: 'string',
            required: true
        },
        {
            name: 'databaseUrl',
            description: 'Your firebase database url',
            type: 'string',
            required: true
        }
    ];

    signupParams: any[];
    options: { history: boolean; save: boolean; db: boolean };
    disabled: boolean;

    constructor(private app: any, private config: any, private express: any) {
        if ( ! FirebaseAuthentication.initialize && this.config.path && this.config.databaseUrl) {
            const serviceAccount = require(path.join(this.app.path, config.path));
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL: config.databaseUrl
            });
            FirebaseAuthentication.initialize = true;
        }
    }

    start() {
        this._addPermissions();
    }

    private _addPermissions() {
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
            readOnly: true
        });
    }
}
