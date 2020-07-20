import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Todo from './components/Todo'
import Login from './components/Login/Login'
import { auth } from './services/firebase'

const App = () => {
  const [firebaseUser, setFirebaseUser] = React.useState(false)

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user)
      if (user) {
        setFirebaseUser(user)
      } else {
        setFirebaseUser(null)
      }
    })
  }, [])

  return firebaseUser !== false ? (
    <Router>
      <div className='container'>
        <Navbar firebaseUser={firebaseUser} />
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/admin'>
            <Todo />
          </Route>
          <Route path='/' exact>
            Ruta de inicio
          </Route>
        </Switch>
      </div>
    </Router>
  ) : (
    <p>Cargando...</p>
  )
}

export default App
