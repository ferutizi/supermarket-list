import './PintarError.scss';

const PintarError = ({children}) => {
    return(
      <div className='error'>{children}</div>
    );
}

export default PintarError;