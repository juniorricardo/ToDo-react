import React, { useState } from 'react'
import { auth } from './../../services/firebase'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [esRegistro, setEsRegistro] = useState(false)

  const procesarDatos = e => {
    e.preventDefault()
    if (!email.trim()) {
      setError('Ingrese email')
      return
    }
    if (!password.trim()) {
      setError('Ingrese password')
      return
    }
    if (password.length < 6) {
      setError('Password debe ser mayor a 6 caracteres')
      return
    }
    setError(null)
    if (esRegistro) {
      Registrar()
    }
  }

  const Registrar = React.useCallback(async () => {
    try {
      const response = await auth.createUserWithEmailAndPassword(email, password)
      console.log(response)
    } catch (error) {
      debugger
      console.log(error)
      if (error.code === 'auth/email-already-in-use') {
        setError('Email ingresado ya existe.')
        return
      }
      if (error.code === 'auth/invalid-email') {
        setError('Email no válido.')
        return
      }
    }
  }, [email, password])
  return (
    <div className='mt-5'>
      <h3 className='text-center'>
        {esRegistro ? 'Registro' : 'Acceso a cuenta'}
      </h3>
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
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type='password'
              className='form-control mb-2'
              placeholder='Ingrese su contraseña'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button className='btn btn-dark btn-lg btn-block' type='submit'>
              {esRegistro ? 'Registrarse' : 'Acceder'}
            </button>
            <button
              className='btn btn-info btn-sm btn-block'
              type='button'
              onClick={() => setEsRegistro(!esRegistro)}
            >
              {esRegistro ? 'Ya tengo cuenta' : '¿No tenes una cuenta?'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
