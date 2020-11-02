import React from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { auth } from './../services/firebase'
import { FaGithubAlt, FaUser } from 'react-icons/fa'

const Navbar = (props) => {
  const cerrarSesion = () => {
    auth.signOut().then(() => {
      props.history.push('/login')
    })
  }

  return (
    <div className='navbar navbar-dark bg-dark'>
      <Link to='/' className='navbar-brand'>
        To do App - Novem <FaGithubAlt />
      </Link>
      <div className='d-flex'>
        <NavLink className='btn btn-dark mr-2' to='/' exact>
          Inicio
        </NavLink>

        {props.firebaseUser && (
          <React.Fragment>
            <NavLink className='btn btn-dark mr-2' to='/pokemon' exact>
              Pokemon
            </NavLink>
            <NavLink className='btn btn-dark mr-2' to='/admin'>
              Admin
            </NavLink>
          </React.Fragment>
        )}
        {props.firebaseUser !== null ? (
          <button className='btn btn-dark' onClick={() => cerrarSesion()}>
            Cerrar sesion
          </button>
        ) : (
          <NavLink className='btn btn-dark' to='/login'>
            Login <FaUser />
          </NavLink>
        )}
      </div>
    </div>
  )
}

export default withRouter(Navbar)
