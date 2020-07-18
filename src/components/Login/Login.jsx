import React, { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

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
    if (password.length > 6) {
      setError('Password debe ser mayor a 6 caracteres')
      return
    }
    setError(null)
    console.log('Todas las validaciones son validas')
  }
  return (
    <div className='mt-5'>
      <h3 className='text-center'>Acceso o Registro de usuarios</h3>
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
            <button className='btn btn-dark btn-lg btn-block'>
              Registrarse
            </button>
            <button className='btn btn-info btn-sm btn-block'>
              Ya tengo cuenta
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
