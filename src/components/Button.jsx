
const Button = ({children, cerrar, ...props}) => {
    return(
        <button {...props}>{children} {cerrar}</button>
    )
}

export default Button