import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { auth } from './services/firebase'
import Navbar from './components/Navbar'
import Pokemon from './components/pokemon'
import Admin from './components/Admin'
import Login from './components/Login/Login'
import Reset from './components/Login/Reset'

const App = () => {
  const [firebaseUser, setFirebaseUser] = React.useState(false)

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      //console.log(user)
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
          <Route path='/pokemon' component={Pokemon} />
          <Route path='/admin' component={Admin} />
          <Route path='/login' component={Login} />
          <Route path='/reset' component={Reset} />
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
