# Materia - Addon Firebase Authentication

Manage and identify your Firebase users in your Materia Application backend. 

This addon uses firebase-admin npm package under the hood.

## Use case

If you are using Firebase Authentication on your client app and need to identitfy currently signed-in user server side.

## Features

- List/Create/Update/Delete your firebase users
- Permission to Verify ID Tokens: retrieve your user Firebase unique ID from your sign-in user ID Token

## Installation from NPM

In your Materia application, run `npm install @materia/firebase-authentication` or `yarn add @materia/firebase-authentication`

Restart Materia Designer

## Installation from local files

Clone this repository:

```
git clone git@github.com:geoastronaute/materia-firebase-authentication.git
cd materia-addon-boilerplate
```

Then install dependencies and build:

```
yarn
yarn build

or

npm install
npm run build
```

To test your addon locally before publishing it to NPM, use `npm link` or `yarn link`:

```
cd dist && npm link
```

and in your materia application

```
npm link @materia/firebase-authentication
```

then add `"@materia/firebase-authentication": "^0.1.0"` in the dependencies of the package.json - it will let Materia knows of the existance of the addon.
