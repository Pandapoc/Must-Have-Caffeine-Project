// Initialize Firebase
// FirebaseUI config.

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

// auth().onAuthStateChanged(user => {
//     if (user) {
//         document.querySelector('#login').style.display = 'none'
//         document.querySelector('#signOut').style.display = 'none'
//     }
// })

// document.querySelector('#signOut').addEventListener('click', e => {
//     auth().signOut()
//     window.location.reload()
// })


// document.querySelector('#sbmt').addEventListener('click',
//     e => {
//         e.preventDefault()
//         let name = document.querySelector('#name').value
//         let email = document.querySelector('#email').value
//         let id = db.collection('users').doc().id

//         console.log(name)
//         console.log(email)

//         db.collection('users').doc(id).set({
//             name: name,
//             email: email
//         })
//         document.querySelector('#name').value = ''
//         document.querySelector('#email').value = ''
//     })