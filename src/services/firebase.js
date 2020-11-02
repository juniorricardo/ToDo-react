import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyClYrGuDdrFf9Z7ZFfvxa_0u0rZ6lAHnpA',
  authDomain: 'todo-reactjs-508b5.firebaseapp.com',
  databaseURL: 'https://todo-reactjs-508b5.firebaseio.com',
  projectId: 'todo-reactjs-508b5',
  storageBucket: 'todo-reactjs-508b5.appspot.com',
  messagingSenderId: '480455611734',
  appId: '1:480455611734:web:72c3d554c7f7ea3522f2f7'
}

app.initializeApp(firebaseConfig)

const db = app.firestore()
const auth = app.auth()

export { db, auth, app }
