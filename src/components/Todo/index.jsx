import React, { useState } from 'react'
import { db } from './../../services/firebase'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/es'

const Todo = ({ user }) => {
  const [tareas, setTareas] = useState([])
  const [tarea, setTarea] = useState('')
  const [id, setId] = useState('')
  const [modoEditar, setModoEditar] = useState(false)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const data = await db.collection(user.uid).get()

        const array = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

        setTareas(array)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [user])

  const agregarTarea = async (e) => {
    e.preventDefault()
    if (!tarea.trim()) console.log('vacio')
    else {
      const nuevaTarea = {
        descripcion: tarea,
        fecha: Date.now()
      }
      const data = await db.collection(user.uid).add(nuevaTarea)
      setTareas([...tareas, { ...nuevaTarea, id: data.id }])
      setTarea('')
    }
  }
  const eliminar = async (id) => {
    await db
      .collection(user.uid)
      .doc(id)
      .delete()
      .catch((error) => console.log(error))
    const arrayFiltrado = tareas.filter((item) => item.id !== id)
    setTareas(arrayFiltrado)
  }
  const activarEdicion = (enTarea) => {
    setTarea(enTarea.descripcion)
    setId(enTarea.id)
    setModoEditar(true)
  }
  const editar = async (e) => {
    e.preventDefault()
    await db
      .collection(user.uid)
      .doc(id)
      .update({ descripcion: tarea })
      .catch((error) => console.log(error))
    const arrayActualizado = tareas.map((item) =>
      item.id === id ? { id, descripcion: tarea, fecha: item.fecha } : item
    )
    setTareas(arrayActualizado)
    setId('')
    setModoEditar(false)
    setTarea('')
  }

  return (
    <div className='container mt-3'>
      <div className='row'>
        <div className='col-md-6'>
          <h3>{modoEditar ? 'Editar' : 'Formulario'}</h3>
          <form onSubmit={modoEditar ? editar : agregarTarea}>
            <input
              type='text'
              placeholder='Ingrese una tarea'
              className='form-control'
              value={tarea}
              onChange={(e) => setTarea(e.target.value)}
            />
            <button
              className={`btn btn-block btn-${
                modoEditar ? 'warning' : 'dark'
              } mt-2`}>
              {modoEditar ? 'Actualizar' : 'Agregar'}
            </button>
          </form>
        </div>
        <div className='col-md-6'>
          <h3>To do list</h3>
          <ul className='list-group'>
            {tareas.map((item) => (
              <li className='list-group-item' key={item.id}>
                {item.descripcion}
                <small className='text-muted ml-3'>
                  {moment(item.fecha).format('lll')}
                </small>
                <button
                  className='btn btn-danger btn-sm float-right'
                  onClick={() => eliminar(item.id)}>
                  Eliminar
                </button>
                <button
                  className='btn btn-warning btn-sm float-right mr-2'
                  onClick={() => activarEdicion(item)}>
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

export default withRouter(Todo)
