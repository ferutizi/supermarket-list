const Item = ({children, ...props}) => {
    return(
        <div {...props}>{children}</div>
    );
}

export default Item;