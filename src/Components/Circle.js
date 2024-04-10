function Circle(props){
    return (
            <div key={props.key} id="circle" className={props.className} style={props.style}></div>
        );
}

export default Circle;