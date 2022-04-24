import { v4 as uuidv4 } from 'uuid';

import { useState } from 'react';
import useContador from './hooks/useContador';
import useFormulario from './hooks/useFormulario';
import Button from './components/Button';
import Container from './components/Container';
import Modal from './components/Modal';
import Li from './components/Li';
import Item from './components/Item';
import List from './components/List';

function App() {
  let [estadoModal, setEstadoModal] = useState(false)
  const [formulario, handleChange, reset] = useFormulario({
    id: uuidv4(),
  })

  const [items, setItems] = useState([])

  const showModal = () => {
    setEstadoModal(estadoModal = true)
  }

  const [contador, aumentar] = useContador()

  const submit = (e) => {
    e.preventDefault()

    aumentar()
    setEstadoModal(false)

    setItems([
      ...items,
      formulario,
    ])

    reset()
  }

  const eliminar = () => {
    console.log(formulario.id)
    setItems([
      ...items,
      formulario.splice(formulario.id)
    ])
  }

  console.log(formulario.id)

  return (
    <>
      <Container>
        <h1>Supermarket list</h1>
        <h3>item(s): {contador}</h3>
        <Button className='btn--principal' onClick={showModal}>Add item</Button>
        <Modal estado={estadoModal} cambiarEstado={setEstadoModal}>
          <h2>Add item</h2>
          <form onSubmit={submit}>
            <input
            name='formulario'
            placeholder='product'
            value={formulario.value}
            onChange={handleChange}
            />
            <Button className='btn--secundario' onClick={estadoModal = () => setEstadoModal(false)}>Close</Button>
            <Button className='btn--principal' type='submit'>Add</Button>
            <Button className='btn--principal grande'><span>Add </span>and add another</Button>
          </form>
        </Modal>
      </Container>
      <List>
        {items.map(x =>
          <Item className='item--container'>
            <Li className='item--list' key={x.id}>{x.formulario}</Li>
            <span onClick={() => eliminar()} className='btn--inherit'>delete</span>
          </Item>
        )}
      </List>
    </>
  );
}

export default App;
