import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { db, auth } from '../../services/firebase'

const Reset = ({ history }) => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)

  const procesarDatos = (e) => {
    e.preventDefault()
    if (!email.trim()) {
      setError('Ingrese email')
      return
    }
    setError(null)
    recuperar()
  }

  const recuperar = React.useCallback(async () => {
    try {
      await auth.sendPasswordResetEmail(email)
      console.log('correo enviado')
      history.push('/login')
    } catch (error) {
      if (
        error.code === 'auth/invalid-email' ||
        error.code === 'auth/user-not-found'
      ) {
        setError('Email ingresado no valido')
        return
      }
      console.log(error)
      setError(error.message)
    }
  }, [email, history])

  return (
    <div className='mt-3'>
      <h3 className='text-center display-4'>Recuperar contraseña</h3>
      <hr />
      <div className='row justify-content-center'>
        <div className='col-12 col-sm-8 col-md-6 col-xl-4'>
          <form onSubmit={procesarDatos}>
            {error && <div className='alert alert-danger'>{error}</div>}
            <input
              type='email'
              className='form-control mb-2'
              placeholder='Ingrese un email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className='btn btn-dark btn-lg btn-block' type='submit'>
              Reiniciar contraseña
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Reset)
