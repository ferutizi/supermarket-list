import './Modal.scss'

const Modal = ({ children, estado }) => {
  return (
    <>
      {estado
        ? <div className='overlay'>
          <div className='card'>
            {children}
          </div>
        </div>
        : null}
    </>
  )
}

export default Modal
