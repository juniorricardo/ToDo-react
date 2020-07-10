import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyCsM5r_OMR_7sUiTeV2XywLFjQTBvgxYGc",
  authDomain: "crud-udemy-react-d0536.firebaseapp.com",
  databaseURL: "https://crud-udemy-react-d0536.firebaseio.com",
  projectId: "crud-udemy-react-d0536",
  storageBucket: "crud-udemy-react-d0536.appspot.com",
  messagingSenderId: "201528056210",
  appId: "1:201528056210:web:48c732b1ce012e3302494b"
};

firebase.initializeApp(firebaseConfig)

export { firebase }