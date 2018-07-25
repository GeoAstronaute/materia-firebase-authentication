/* const requireWithoutCache = (name) => {
	let p = require.resolve(name);
	if (require.cache[p]) {
			delete require.cache[p]
	}
	return require(name)
} */

export default class FirebaseAuthentication {
    public static displayName = '@materia/firebase-authentication';
    public static logo = 'https://s3.amazonaws.com/kinlane-productions/api-evangelist/noun-project/the-noun-project-clicking-heels.jpg';

    public static installSettings = [
    ];

    constructor(app, config) { }

    start() {
    }

    uninstall(app) { }
}
