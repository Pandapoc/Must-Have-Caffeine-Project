var config = {
    apiKey: "AIzaSyCPt5qX-k4l600vUyHwS1toWW5lhn2QvH4",
    authDomain: "must-have-caffine-project.firebaseapp.com",
    databaseURL: "https://must-have-caffine-project.firebaseio.com",
    projectId: "must-have-caffine-project",
    storageBucket: "must-have-caffine-project.appspot.com",
    messagingSenderId: "588514633351"
}
firebase.initializeApp(config)


let db = firebase.firestore()
let storage = firebase.storage()
let auth = firebase.auth

const uiConfig = {
    signInSuccessURL: 'homepage.html',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    tosUrl: `https://google.com`,
    privacyPolicyUrl: function () {
        window.location.assign(`https://google.com`);
    }
}

const ui = new firebaseui.auth.AuthUI(auth())
ui.start(`#login`, uiConfig)
