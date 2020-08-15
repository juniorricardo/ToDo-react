import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detallePokemonAction } from './../../redux/pokeducks'

const Detail = () => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    const fetchData = () => {
      dispatch(detallePokemonAction)
    }
    fetchData()
  }, [dispatch])

  const pokemon = useSelector((store) => store.pokemones.pokeInfoCard)
  console.log(pokemon)
  return (
    <div>
      <h3>Detalle Pokemon</h3>
      <hr />
      {pokemon && (
        <div className='card p-0 text-center'>
          <div className='card-body'>
            <img
              src={pokemon.picture}
              className='img-fluid mb-2 rounded mx-auto d-block shadow-sm p-3 bg-white rounded'
            />
            {pokemon.types.map((t, index) => (
              <span className='badge badge-secondary mr-1' key={index}>
                {t}
              </span>
            ))}
            <div className='card-title text-capitalize mt-2'>
              <span className='font-weight-bold text-uppercase'>
                {pokemon.name}
              </span>
            </div>
            <p className='card-text'>
              Alto:<span className='font-weight-bold'>{pokemon.height}</span> |
              Ancho:
              <span className='font-weight-bold'>{pokemon.weight}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Detail
