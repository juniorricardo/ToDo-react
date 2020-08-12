import React from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { auth } from './../services/firebase'

const Navbar = (props) => {
  const cerrarSesion = () => {
    auth.signOut().then(() => {
      props.history.push('/login')
    })
  }

  return (
    <div className='navbar navbar-dark bg-dark'>
      <Link to='/' className='navbar-brand'>
        To do App - Novem
      </Link>
      <div>
        <div className='d-flex'>
          <NavLink className='btn btn-dark mr-2' to='/' exact>
            Inicio
          </NavLink>
          <NavLink className='btn btn-dark mr-2' to='/pokemon' exact>
            Pokemon
          </NavLink>
          {props.firebaseUser && (
            <NavLink className='btn btn-dark mr-2' to='/admin'>
              Admin
            </NavLink>
          )}
          {props.firebaseUser !== null ? (
            <button className='btn btn-dark' onClick={() => cerrarSesion()}>
              Cerrar sesion
            </button>
          ) : (
            <NavLink className='btn btn-dark' to='/login'>
              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  )
}

export default withRouter(Navbar)
