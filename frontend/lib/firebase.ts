// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/compat/app'
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import 'firebase/compat/analytics'

// Add the Firebase products that you want to use
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/functions'

const firebaseConfig = {
    apiKey: 'AIzaSyAhAboU5u76UAidJnBdSJJ82dIpz_VjUas',
    authDomain: 'book-tree--dev.firebaseapp.com',
    projectId: 'book-tree--dev',
    storageBucket: 'book-tree--dev.appspot.com',
    messagingSenderId: '664873500340',
    appId: '1:664873500340:web:0a00c42b344849ff4c21e1',
    measurementId: 'G-LSXL0EBCF4'
}

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}

// emulatorを使用
// if (process.browser && location.hostname === 'localhost') {
//     firebase.functions().useEmulator('localhost', 5001)
// }

firebase.auth().languageCode = 'ja'

export const db = firebase.firestore()

export default firebase
