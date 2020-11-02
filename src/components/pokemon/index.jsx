import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  obtenerPokemonsAction,
  siguientePokemonesAction,
  anteriorPokemonesAction,
  detallePokemonAction
} from './../../redux/pokeDucks'
import { FaChevronLeft, FaChevronRight, FaSearchPlus } from 'react-icons/fa'
import Detail from './Detail'

const Pokemon = () => {
  const dispatch = useDispatch()

  const pokemones = useSelector((store) => store.pokemones.results)
  const next = useSelector((store) => store.pokemones.next)
  const previous = useSelector((store) => store.pokemones.previous)

  return (
    <div className='border border-black p-3'>
      <p className='display-4 text-center'>Pokemon</p>
      <div className='row'>
        <div className='col-md-6'>
          <h3>Lista</h3>
          <hr />
          <div className='my-2'>
            {pokemones.length === 0 && (
              <button
                onClick={() => dispatch(obtenerPokemonsAction())}
                className='btn btn-sm btn-dark'>
                Obtener Pokemons
              </button>
            )}
            {previous && (
              <button
                onClick={() => dispatch(anteriorPokemonesAction())}
                className='ml-2 btn btn-sm btn-dark'>
                <FaChevronLeft /> Anterior
              </button>
            )}
            {next && (
              <button
                onClick={() => dispatch(siguientePokemonesAction())}
                className='ml-2 btn btn-sm btn-dark'>
                Siguiente <FaChevronRight />
              </button>
            )}
            <ul className='list-group list-group mt-2'>
              {pokemones.map((poke, index) => (
                <li
                  key={index}
                  className='list-group-item text-capitalize text-monospace'>
                  {poke.name}
                  <button
                    className='btn btn-info btn-sm float-right'
                    onClick={() => dispatch(detallePokemonAction(poke.url))}>
                    <FaSearchPlus />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='col-md-6'>
          <Detail />
        </div>
      </div>
    </div>
  )
}

export default Pokemon
