import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
  apiKey: "AIzaSyCsM5r_OMR_7sUiTeV2XywLFjQTBvgxYGc",
  authDomain: "crud-udemy-react-d0536.firebaseapp.com",
  databaseURL: "https://crud-udemy-react-d0536.firebaseio.com",
  projectId: "crud-udemy-react-d0536",
  storageBucket: "crud-udemy-react-d0536.appspot.com",
  messagingSenderId: "201528056210",
  appId: "1:201528056210:web:48c732b1ce012e3302494b"
};

app.initializeApp(firebaseConfig)

const db = app.firestore()
const auth = app.auth()

export { db, auth }