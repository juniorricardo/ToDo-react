import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Todo from './components/Todo'
import Login from './components/Login/Login'

const App = () => {
  return (
    <Router>
      <div className='container'>
        <Navbar />
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
  )
}

export default App
