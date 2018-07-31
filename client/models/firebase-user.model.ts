export interface FirebaseUser {
    uid: string;
    email: string;
    emailVerified: boolean;
    phoneNumber: string;
    displayName: string;
    photoURL: string;
    disabled: boolean;
    metadata?: any;
    providerData?: any;
    tokensValidAfterTime?: string;
}
