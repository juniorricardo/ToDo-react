import React, { useState } from 'react'
import { firebase } from './firebase'

const App = () => {
  const [tareas, setTareas] = useState([])
  const [tarea, setTarea] = useState('')
  const [id, setId] = useState('')
  const [modoEditar, setModoEditar] = useState(false)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const db = firebase.firestore()
        const data = await db.collection('tareas').get()

        const array = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        console.log(data.docs);
        
        setTareas(array)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  const agregarTarea = async e => {
    e.preventDefault()
    if (!tarea.trim()) console.log('vacio')
    else {
      const db = firebase.firestore()
      const nuevaTarea = {
        name: tarea,
        fecha: Date.now()
      }
      const data = await db.collection('tareas').add(nuevaTarea)
      setTareas([...tareas, { ...nuevaTarea, id: data.id }])
      setTarea('')
    }
  }

  const eliminar = async id => {
    const db = firebase.firestore()
    await db
      .collection('tareas')
      .doc(id)
      .delete()
      .catch(error => console.log(error))
    const arrayFiltrado = tareas.filter(item => item.id !== id)
    setTareas(arrayFiltrado)
  }
  const activarEdicion = enTarea => {
    setTarea(enTarea.name)
    setId(enTarea.id)
    setModoEditar(true)
  }
  const editar = async e => {
    e.preventDefault()
    const db = firebase.firestore()
    const data = await db
      .collection('tareas')
      .doc(id)
      .update({ name: tarea })
      .catch(error => console.log(error))
    const arrayActualizado = tareas.map(item =>
      item.id === id ? { id, name: tarea, fecha: item.fecha } : item
    )
    setTareas(arrayActualizado)
    setId('')
    setModoEditar(false)
    setTarea('')
  }

  return (
    <div className='container mt-2'>
      <div className='row'>
        <div className='col-md-6'>
          <h3>{modoEditar ? 'Editar' : 'Formulario'}</h3>
          <form onSubmit={modoEditar ? editar : agregarTarea}>
            <input
              type='text'
              placeholder='Ingrese una tarea'
              className='form-control'
              value={tarea}
              onChange={e => setTarea(e.target.value)}
            />
            <button
              className={`btn btn-block btn-${
                modoEditar ? 'warning' : 'dark'
              } mt-2`}
            >
              {modoEditar ? 'Actualizar' : 'Agregar'}
            </button>
          </form>
        </div>
        <div className='col-md-6'>
          <ul className='list-group'>
            {tareas.map(item => (
              <li className='list-group-item' key={item.id}>
                {item.name}
                <button
                  className='btn btn-danger btn-sm float-right'
                  onClick={() => eliminar(item.id)}
                >
                  Eliminar
                </button>
                <button
                  className='btn btn-warning btn-sm float-right mr-2'
                  onClick={() => activarEdicion(item)}
                >
                  Editar
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
