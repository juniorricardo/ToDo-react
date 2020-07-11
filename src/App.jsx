import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Todo from './components/Todo'

const App = () => {
  return (
    <Router>
      <div className='container'>
        <Navbar />
        <Switch>
          <Route path='/login'>Ruta de login</Route>
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
