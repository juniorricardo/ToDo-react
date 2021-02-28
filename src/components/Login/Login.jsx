import React, { useState } from 'react'
import { db, auth } from './../../services/firebase'
import firebase from 'firebase'
import { withRouter } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'

const Login = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [esRegistro, setEsRegistro] = useState(false)

  const procesarDatos = (e) => {
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
    } else {
      iniciarSesion()
    }
  }

  const Registrar = React.useCallback(async () => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password)
      console.log(res.user)
      await db.collection(res.user.uid).add({
        descripcion: 'Inicio de coleccion',
        fecha: Date.now()
      })
      LimpiarCampos()
      history.push('/admin')
    } catch (err) {
      console.log(err)
      if (err.code === 'auth/email-already-in-use') {
        setError('Email ingresado ya existe.')
        return
      }
      if (err.code === 'auth/invalid-email') {
        setError('Email no válido.')
        return
      }
    }
  }, [email, password, history])

  const iniciarSesion = React.useCallback(async () => {
    try {
      const res = await auth.signInWithEmailAndPassword(email, password)
      console.log(res.user)
      LimpiarCampos()
      history.push('/admin')
    } catch (err) {
      console.log(err)
      if (
        err.code === 'auth/invalid-email' ||
        err.code === 'auth/user-not-found' ||
        err.code === 'auth/wrong-password'
      ) {
        setError('Email y/o contraseña no son validos')
        return
      } else {
        setError(`Error no interpretado: ${err.code}`)
        return
      }
    }
  }, [email, password, history])

  const LimpiarCampos = () => {
    setEmail('')
    setPassword('')
    setError(null)
  }

  const accesoConGoogle = React.useCallback(async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    await auth
      .signInWithPopup(provider)
      .then(async (res) => {
        console.log(res.user)

        const querySnapshot = await db.collection(res.user.uid).limit(1).get()
        if (querySnapshot.empty) {
          await db.collection(res.user.uid).add({
            descripcion: 'Inicio de coleccion',
            fecha: Date.now()
          })
        }
        LimpiarCampos()
        history.push('/admin')
      })
      .catch((err) => {
        console.log(err)
        if (err.code === 'auth/email-already-in-use') {
          setError('Email ingresado ya existe.')
          return
        } else if (err.code === 'auth/invalid-email') {
          setError('Email no válido.')
          return
        } else {
          //"auth/wrong-password"
          setError(`Error no interpretado: ${err.code}`)
          return
        }
      })
  }, [history])

  return (
    <div className='mt-3'>
      <h3 className='text-center display-4'>
        {esRegistro ? 'Registro' : 'Login'}
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
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              className='form-control mb-2'
              placeholder='Ingrese su contraseña'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className='btn btn-dark btn-lg btn-block' type='submit'>
              {esRegistro ? 'Registrarse' : 'Acceder'}
            </button>
            <button
              className='btn btn-dark btn-sm btn-block'
              type='button'
              onClick={() => accesoConGoogle()}>
              {esRegistro ? 'Registrarse con Google' : 'Acceder con Google'}
              <FcGoogle size={20} />
            </button>
            <button
              className='btn btn-info btn-sm btn-block'
              type='button'
              onClick={() => setEsRegistro(!esRegistro)}>
              {esRegistro ? 'Ya tengo cuenta' : '¿No tenes una cuenta?'}
            </button>
            {!esRegistro ? (
              <button
                className='btn btn-danger btn-lg btn-sm mt-2'
                type='button'
                onClick={() => history.push('/reset')}>
                Recuperar contraseña
              </button>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Login)
