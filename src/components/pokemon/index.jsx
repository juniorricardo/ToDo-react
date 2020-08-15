import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { obtenerPokemonsAction } from './../../redux/pokeducks'

const Pokemon = () => {
  const dispatch = useDispatch()

  const pokemones = useSelector((store) => store.pokemones.array)

  return (
    <div>
      Lista de Pokemons
      <button
        onClick={() => dispatch(obtenerPokemonsAction())}
        className='btn btn-dark btn-block'>
        Obtener Pokemons
      </button>
      <ul>
        {pokemones.map((poke, index) => (
          <li key={index}>{poke.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Pokemon
