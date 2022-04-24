import './List.scss'

const List = ({children}) => {
    return(
        <div className='list--container'>
            <ul>{children}</ul>
        </div>
    )
}

export default List