import { app, auth } from './../services/firebase'

// Data initial
const dataInicial = {
  loading: false,
  activo: false
}

// Types
const LOADING = 'LOADING'
const USER_SUCCESS = 'USER_SUCCESS'
const USER_ERROR = 'USER_ERROR'
const CERRAR_SESION = 'CERRAR_SESION'

// Reducer
export default function usuarioReducer(state = dataInicial, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true }
    case USER_ERROR:
      return { ...dataInicial }
    case USER_SUCCESS:
      return {
        ...state,
        loading: false,
        activo: true,
        user: action.payload.user
      }
    case CERRAR_SESION:
      return { ...dataInicial }
    default:
      return { ...state }
  }
}

// Actions
export const accederAccion = () => async (dispatch) => {
  dispatch({
    type: LOADING
  })

  try {
    const provider = new app.auth.GoogleAuthProvider()
    const res = await auth.signInWithPopup(provider)

    console.log(res)
    dispatch({
      type: USER_SUCCESS,
      payload: {
        uid: res.user.uid,
        email: res.user.email
      }
    })
    localStorage.setItem(
      'usuario',
      JSON.stringify({
        uid: res.user.uid,
        email: res.user.email
      })
    )
  } catch (error) {
    console.log(error)
    dispatch({
      type: USER_ERROR
    })
  }
}

export const consultarUsuarioActiveAction = () => (dispatch) => {
  if (localStorage.getItem('usuario')) {
    dispatch({
      type: USER_SUCCESS,
      payload: {
        user: JSON.parse(localStorage.getItem('usuario'))
      }
    })
  }
}
