import axios from 'axios'

// constantes
const dataInicial = {
  count: 0,
  next: null,
  previous: null,
  results: [],
  pokeInfoCard: null
}

// types
const GET_POKE_SUCCESS = 'GET_POKE_SUCCESS'
const NEXT_POKE_SUCCESS = 'NEXT_POKE_SUCCESS'
const PREVIOUS_POKE_SUCCESS = 'PREVIOUS_POKE_SUCCESS'
const SHOW_POKE_DETAIL = 'SHOW_POKE_DETAIL'

// reducer
export default function pokesReducer(state = dataInicial, action) {
  switch (action.type) {
    case GET_POKE_SUCCESS:
      return { ...state, ...action.payload }
    case NEXT_POKE_SUCCESS:
    case PREVIOUS_POKE_SUCCESS:
      return {
        ...state,
        ...action.payload,
      }
    case SHOW_POKE_DETAIL:
      return {
        ...state,
        pokeInfoCard: action.payload
      }
    default:
      return state
  }
}

// actions
export const obtenerPokemonsAction = () => async (dispatch, getState) => {

  if (localStorage.getItem('offset=0')) {
    dispatch({
      type: GET_POKE_SUCCESS,
      payload: JSON.parse(localStorage.getItem('offset=0'))
    })
    return
  }
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`)
    dispatch({
      type: GET_POKE_SUCCESS,
      payload: res.data
    })
    localStorage.setItem('offset=0', JSON.stringify(res.data))
  } catch (error) {
    console.log(error)
  }

}

export const siguientePokemonesAction = () => async (dispatch, getState) => {
  const { next } = getState().pokemones

  if (localStorage.getItem(next)) {
    dispatch({
      type: NEXT_POKE_SUCCESS,
      payload: JSON.parse(localStorage.getItem(next))
    })
    return
  }
  try {
    const res = await axios.get(next)
    dispatch({
      type: NEXT_POKE_SUCCESS,
      payload: res.data
    })
    localStorage.setItem(next, JSON.stringify(res.data))
  } catch (error) {
    console.log(error)
  }
}


export const anteriorPokemonesAction = () => async (dispatch, getState) => {
  const { previous } = getState().pokemones

  if (localStorage.getItem(previous)) {
    dispatch({
      type: PREVIOUS_POKE_SUCCESS,
      payload: JSON.parse(localStorage.getItem(previous))
    })
    return
  }
  try {
    const res = await axios.get(previous)
    dispatch({
      type: PREVIOUS_POKE_SUCCESS,
      payload: res.data
    })
    localStorage.setItem(previous, JSON.stringify(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const detallePokemonAction = (url = 'https://raw.githubusercontent.com/juniorricardo/ToDo-react/master/src/images/how.svg') => async (dispatch) => {

  try {
    const res = await axios.get(url)
    console.log(res.data)
    dispatch({
      type: SHOW_POKE_DETAIL,
      payload: {
        name: res.data.name,
        weight: res.data.weight,
        height: res.data.height,
        picture: res.data.sprites.other.dream_world.front_default,
        types: res.data.types.map(t => t.type.name)
      }
    })
  } catch (error) {
    console.log(error)
  }
}
