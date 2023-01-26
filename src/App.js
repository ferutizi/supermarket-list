import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import useContador from './hooks/useContador';
import useFormulario from './hooks/useFormulario';
import Button from './components/Button';
import Container from './components/Container';
import Modal from './components/Modal';
import Li from './components/Li';
import Item from './components/Item';
import List from './components/List';
import PintarError from './components/PintarError';

function App() {
  let [estadoModal, setEstadoModal] = useState(false)
  const [formulario, handleChange, reset] = useFormulario({
    id: uuidv4(),
  });

  const [items, setItems] = useState([]);
  const [contador, aumentar, disminuir] = useContador();
  const [error, setError] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const dat = {items}
    
    if(!formulario.formulario) {
      setError(true);
      console.log('err');
      PintarError();
      return;
    }
    setError(false);
    aumentar();
    setItems([
      ...items,
      formulario,
    ]);

    fetchPost(dat);

    e.target.reset();
    reset();
  }

  const fetchPost = async (dat) => {
    const data = await fetch('http://localhost:8080/guardar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"name": "b"})
    })
  }

  const add = () => {
    setEstadoModal(true);
    setError(false);
  }

  const showModal = (show) => {
    if(!formulario.formulario) {
      setTimeout(() => {
        setEstadoModal(estadoModal = true)
      }, 10);
    } else {
      setTimeout(() => {
        setEstadoModal(show)
      }, 10);
      return;
    }
  }

  const eliminar = (id) => {
    setItems((items) => items.filter((x) => x.id !== id));

    disminuir();
  }

  return (
    <>
      <Container>
        <h1>Supermarket list</h1>
        <h3>item(s): {contador}</h3>
        <Button className='btn--principal' onClick={add}>Add item</Button>
        <Modal estado={estadoModal} cambiarEstado={showModal}>
          <h2>Add item</h2>
          <form onSubmit={submit}>
            <input
            name='formulario'
            placeholder='product'
            value={formulario.value}
            onChange={handleChange}
            autoFocus='autofocus'
            />

            <PintarError>
              {error && 'enter the product you want to add to the list'}  
            </PintarError>

            <Button
            className='btn--secundario'
            type='button'
            onClick={estadoModal = () => setEstadoModal(false)}
            >Close
            </Button>

            <Button
            className='btn--principal'
            onClick={estadoModal = () => showModal(false)}
            >Add
            </Button>

            <Button
            className='btn--principal grande'
            onClick={estadoModal = () => showModal(true)}
            ><span>Add </span>and add another
            </Button>

          </form>
        </Modal>
      </Container>
      <List>
        {items.map(x =>
          <Item className='item--container'>
            <Li className='item--list' key={x.id}>
              {x.formulario}
            </Li>
            <span onClick={() => eliminar(x.id)} className='btn--inherit'>delete</span>
          </Item>
        )}
      </List>
    </>
  );
}

export default App;
