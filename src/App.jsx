import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login/Login'
import { auth } from './services/firebase'
import Admin from './components/Admin'
import Reset from './components/Login/Reset'
import Pokemon from './components/pokemon'
import { Provider } from 'react-redux'
import generateStore from './redux/store'

const App = () => {
  const [firebaseUser, setFirebaseUser] = React.useState(false)

  const store = generateStore()

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
    <Provider store={store}>
      <Router>
        <div className='container'>
          <Navbar firebaseUser={firebaseUser} />
          <Switch>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/pokemon'>
              <Pokemon />
            </Route>
            <Route path='/admin'>
              <Admin />
            </Route>
            <Route path='/reset'>
              <Reset />
            </Route>
            <Route path='/' exact>
              Ruta de inicio
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  ) : (
    <p>Cargando...</p>
  )
}

export default App
