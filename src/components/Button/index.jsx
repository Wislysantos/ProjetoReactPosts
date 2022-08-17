import "./styles.css";

export const Button =({text, onclick, disabled})=>{
    return(
        <button 
        className="button" 
        onClick={onclick} 
        disabled={disabled}>
            {text}
        </button>
    )
}