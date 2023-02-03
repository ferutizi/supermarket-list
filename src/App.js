import { useState, useEffect } from 'react';
import useFormulario from './hooks/useFormulario';
import Button from './components/Button';
import Container from './components/Container';
import Modal from './components/Modal';
import Li from './components/Li';
import Item from './components/Item';
import List from './components/List';
import PintarError from './components/PintarError';

function App() {
  let [estadoModal, setEstadoModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [idToUpdate, setIdToUpdate] = useState(false);
  const [formulario, handleChange, reset] = useFormulario({});
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getTodo();
  }, []);

  const submit = (e) => {
    e.preventDefault();
    
    if(!formulario.name) {
      setError(true);
      console.log('err');
      PintarError();
      return;
    }
    setItems([
      ...items,
      formulario,
    ]);
    setError(false);
    if(isUpdate) {
      updateTodo(formulario)
    } else {
      postTodo(formulario);
    }
    setEstadoModal(false);
    setIsUpdate(false);
    e.target.reset();
    reset();
  }

  const postTodo = async (formulario) => {
    const res = await fetch('http://localhost:8080/guardar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: formulario.name})
    })
    const data = await res.json();
    formulario.id = data.id;
  }

  const getTodo = async () => {
    const res = await fetch('http://localhost:8080/');
    const data = await res.json();
    setItems(data)
  }
  
  const add = () => {
    setEstadoModal(true);
    setError(false);
  }

  const showModal = (show) => {
    if(!formulario.name) {
      setTimeout(() => {
        setEstadoModal(estadoModal = true);
      }, 10);
    } else {
      setTimeout(() => {
        setEstadoModal(show);
      }, 10);
      return;
    }
  }

  const toUpdate = (id) => {
    setIsUpdate(true);
    setIdToUpdate(id);
  }

  const updateTodo = async (formulario) => {
    await fetch('http://localhost:8080/update/' + idToUpdate, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: idToUpdate, name: formulario.name})
    });
    getTodo();
  }

  const deleteTodo = async (id) => {
    await fetch('http://localhost:8080/' + id, {
      method: 'DELETE'
    });
    setItems(items.filter(item => item.id !== id));  
  }

  const deleteAll = async () => {
    await fetch('http://localhost:8080/delete', {
      method: 'DELETE'
    });
    getTodo();
  }

  return (
    <>
      <Container>
        <h1>Supermarket list</h1>
        <h3>item(s): {items.length}</h3>
        <Button className='btn--principal' onClick={add}>Add item</Button>
        <Modal estado={estadoModal} cambiarEstado={showModal}>
          <h2>Add item</h2>
          <form onSubmit={submit}>
            <input
            name='name'
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
        <Modal estado={isUpdate} cambiarEstado={showModal}>
          <h2>Update item</h2>
          <form onSubmit={submit}>
            <input
            name='name'
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
            onClick={estadoModal = () => setIsUpdate(false)}
            >Close
            </Button>
            <Button
            type='submit '
            className='btn--principal'
            onClick={estadoModal = () => showModal(false)}
            >Update
            </Button>

          </form>
        </Modal>
      </Container>
      <List>
        {items.map(item =>
          <Item key={item.id} className='item--container'>
            <Li className='item--list' key={item.id}>
              {item.name}
            </Li>
            <div style={{display: 'flex', gap: '0.5em'}}>
              <span onClick={() => toUpdate(item.id)} className='btn--inherit'>edit</span>
              <span onClick={() => deleteTodo(item.id)} className='btn--inherit'>delete</span>
            </div>
          </Item>
        )}
      </List>
      {items.length > 0 ?
        <Button className='btn--principal' onClick={() => deleteAll()}>Eliminar todos</Button>
        : null}
    </>
  );
}

export default App;
