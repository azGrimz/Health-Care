import "./styles.css"

export function Button(props){
    return(
        <>
        <button className="buttonGlobal"
            
        >
            {props.content}
        </button>
        </>
    );
};
