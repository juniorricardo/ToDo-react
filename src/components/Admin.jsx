import React, { useState } from 'react'
import { auth } from './../services/firebase'
import { withRouter } from 'react-router-dom'
import Todo from './Todo'

const Admin = (props) => {
  const [user, setUser] = useState(null)
  React.useEffect(() => {
    if (auth.currentUser) {
      console.log('existe')
      setUser(auth.currentUser)
    } else {
      console.log('no existe')
      props.history.push('/login')
    }
  }, [props.history])

  return (
    <div className='mt-3'>
      <h3 className='text-center display-4 font-roboto'>Administracion</h3>
      {user && <Todo user={user} />}
    </div>
  )
}

export default withRouter(Admin)
