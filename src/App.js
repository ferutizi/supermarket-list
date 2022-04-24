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

  const showModal = (show) => {
    setEstadoModal(estadoModal = show)
  }

  const [contador, aumentar] = useContador()

  const submit = (e) => {
    e.preventDefault()

    aumentar()

    setItems([
      ...items,
      formulario,
    ])

    reset()
  }

  const eliminar = (id) => {
    console.log(id)
    setItems([
      items,
      items.filter(formulario => formulario.id !== id)
    ])
  }

  return (
    <>
      <Container>
        <h1>Supermarket list</h1>
        <h3>item(s): {contador}</h3>
        <Button className='btn--principal' onClick={showModal}>Add item</Button>
        <Modal estado={estadoModal} cambiarEstado={showModal}>
          <h2>Add item</h2>
          <form onSubmit={submit}>
            <input
            name='formulario'
            placeholder='product'
            value={formulario.value}
            onChange={handleChange}
            />
            <Button className='btn--secundario' onClick={estadoModal = () => showModal(false)}>Close</Button>
            <Button className='btn--principal' onClick={estadoModal = () => showModal(true)}>Add</Button>
            <Button className='btn--principal grande' onClick={estadoModal = () => showModal(true)}><span>Add </span>and add another</Button>
          </form>
        </Modal>
      </Container>
      <List>
        {items.map(x =>
          <Item className='item--container'>
            <Li className='item--list' key={x.id}>{x.formulario}
              {/* handleDelete handleDelete={() => items.handleDelete(x.id)} */}
            </Li>
            <Button onClick={() => eliminar(x.id)} className='btn--inherit'>delete</Button>
          </Item>
        )}
      </List>
    </>
  );
}

export default App;
