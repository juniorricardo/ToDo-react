/* TODO: 
-> Action: en mayuscula y dos palabras
Caso(type) y nuevo valores.
Estos actions, seran ejecutados en el componente
es recomendable que en lo posible sean pocos, los 
datos con el que se trabajara  */

// 'payload' sera el nuevo estado

export const addBranch = (branch) => ({
  type: 'ADD_BRANCH',
  branch
})

export const removeBranch = (id) => ({
  type: 'REMOVE_BRANCH',
  id
})

export const updateBranch = (branch) => ({
  type: 'UPDATE_BRANCH',
  branch
})